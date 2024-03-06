import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDTO } from 'src/users/dto/create-profile.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserService');

  constructor(
    private prisma: PrismaService
  ) { }

  async createProfile(createProfileDTO: CreateProfileDTO) {
    const { title, description, permissions } = createProfileDTO;

    try {
      await this.prisma.sj_profile.create({
        data: {
          title,
          description,
          permissions: {
            create: permissions,
          },
        },
      });

      return { message: `${title} perfil a sido creado`, success: true };

    } catch (error) {

      this.handleDbExceptions(error)
    }
  }

  async findAllProfile() {
    try {
      const allProfiles = await this.prisma.sj_profile.findMany({
        select: {
          id: true,
          title: true
        }
      })

      return { allProfiles, success: true };

    } catch (error) {

      this.handleDbExceptions(error)
    }

  }

  async createUser(createUserDto: CreateUserDto) {
    const { user_name, password, first_name, last_name, id_profile } = createUserDto;

    try {
      const createdUser = await this.prisma.sj_users.create({
        data: {
          user_name,
          password: bcrypt.hashSync(password, 10),
          first_name,
          last_name,
          id_profile
        },
      });

      return { message: `${createdUser.user_name}: user has been created`, success: true };

    } catch (error) {

      this.handleDbExceptions(error)
    }
  }

  async findAllUsers() {

    try {
      const allUsers = await this.prisma.sj_users.findMany({
        select: {
          id: true,
          user_name: true,
          first_name: true,
          last_name: true,
          profile: {
            select: {
              title: true,
              description: true
            }
          }
        }
      });

      return { allUsers, success: true };

    } catch (error) {

      this.handleDbExceptions(error)
    }
  }

  async disabledUser(id: number) {
    try {

      const existingUser = await this.prisma.sj_users.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingUser) {
        throw new NotFoundException({ id: id });
      }

      if (!existingUser.is_active) {
        return { message: `${existingUser.user_name} user was already disabled`, success: true };
      }

      const updatedUser = await this.prisma.sj_users.update({
        where: {
          id: id,
        },
        data: {
          is_active: false,
        },
      });

      return { message: `${updatedUser.user_name} user successfully disabled`, success: true };

    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async enabledUser(id: number) {
    try {

      const existingUser = await this.prisma.sj_users.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingUser) {
        throw new NotFoundException({ id: id });
      }

      if (existingUser.is_active) {
        return { message: `${existingUser.user_name} user was already enabled`, success: true };
      }

      const updatedUser = await this.prisma.sj_users.update({
        where: {
          id: id,
        },
        data: {
          is_active: true,
        },
      });

      return { message: `${updatedUser.user_name} user successfully enabled`, success: true };

    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  private handleDbExceptions(error: any) {

    const allowedErrorCodes = ['P2002', 'P2003'];

    if (allowedErrorCodes.includes(error.code))
      throw new BadRequestException({ message: error.meta, success: false });

    if (error instanceof NotFoundException) {
      throw new NotFoundException({ message: 'Not found', success: false });
    }

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server log')
  }

}

