import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDTO } from 'src/users/dto/create-profile.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUsersDto } from './dto/update-user.dto';

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

      return { data: '', meta:{ status: 'success',  message: `Perfil '${title}' a sido creado con éxito`} };

    } catch (error) {

      this.handleDbExceptions(error)
    }
  }

  async findAllProfile() {
    try {
      const allProfiles = await this.prisma.sj_profile.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          created_At: true,
        }
      })

      return { data: allProfiles, meta: {status: 'success', message: 'Todos los perfiles de usuarios'} };

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

      return {data: '', meta: { status: 'success', message: `Usuario '${createdUser.user_name}' ha sido creado con éxito`} };

    } catch (error) {
      console.log(error)
      this.handleDbExceptions(error)
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUsersDto) {
    try {

      const user = await this.prisma.sj_users.findUniqueOrThrow({
        where: { id: id },
      });


      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      await this.prisma.sj_users.update({
        where: { id: id },
        data: updateUserDto,
      });

      return { data: '', meta: { status: 'success', message: `Usuario '${user.user_name}' ha sido actualizado con éxito` } };
    } catch (error) {
      this.handleDbExceptions(error);
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
          is_active: true,
          profile: {
            select: {
              id: true,
              title: true,
              description: true
            }
          }
        }
      });

      return { data: allUsers, meta: {status: 'success', message: 'Todos los usuarios'} };

    } catch (error) {

      this.handleDbExceptions(error)
    }
  }

  async disabledUser(id: number) {
    try {

      const existingUser = await this.prisma.sj_users.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      if (!existingUser.is_active) {
        return { data: '', meta: {status: 'suucess', message: `Usuario '${existingUser.user_name}' ya estaba deshabilitado`} };
      }

      const updatedUser = await this.prisma.sj_users.update({
        where: {
          id: id,
        },
        data: {
          is_active: false,
        },
      });

      return {data: '', meta: {status: 'success', message: `Usuario '${updatedUser.user_name}' deshabilitado con éxito`} };

    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async enabledUser(id: number) {
    try {

      const existingUser = await this.prisma.sj_users.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      if (existingUser.is_active) {
        return { data: '', meta: {status: 'suucess', message: `Usuario '${existingUser.user_name}' ya estaba habilitado`} };
      }

      const updatedUser = await this.prisma.sj_users.update({
        where: {
          id: id,
        },
        data: {
          is_active: true,
        },
      });

      return {data: '', meta: {status: 'success', message: `Usuario '${updatedUser.user_name}' habilitado con éxito`} };

    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  private handleDbExceptions(error: any) {

    if(error.code === 'P2002')
      throw new BadRequestException({ errors: [{status: 400, title: 'Ya existe un registo con este nombre de usuario o perfil', detail: error.meta}] })

    if(error.code === 'P2003')
    throw new BadRequestException({ errors: [{status: 400, title: 'No existe el perfil al que quieres asociar este usuario', detail: error.meta}] })

    if(error.code === 'P2025')
    throw new NotFoundException({ errors: [{status: 404, title: 'Usuario no encontrado', detail: ''}] });

    this.logger.error(error)
    throw new InternalServerErrorException({errors: {status: 500, title:'Unexpected error, check server log', detail: error}})
  }

}

