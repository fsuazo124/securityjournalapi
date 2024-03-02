import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDTO } from 'src/users/dto/create-profile.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserService');
  
  constructor(
    private prisma: PrismaService
    ) {}

  async createProfile(createProfileDTO: CreateProfileDTO) {
    const { title, description, permissions } = createProfileDTO;

    try {
    const createdProfile = await this.prisma.sj_profile.create({
      data: {
        title,
        description,
        permissions: {
          create: permissions,
        },
      },
    });

    return createdProfile;

    } catch (error) {

      this.handleDbExceptions( error )
  }

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDbExceptions( error: any ){
    if( error.code === 'P2002' )
        throw new BadRequestException({message:error.meta, success: false});
  
      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server log')
  }
}

