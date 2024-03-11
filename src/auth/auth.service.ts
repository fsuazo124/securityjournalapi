import { ForbiddenException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger('UserService');

  constructor(
    private prisma: PrismaService
  ) { }

  async auth(createAuthDto: CreateAuthDto) {
    const { user_name, password } = createAuthDto;

    try {
      const userCredentials = await this.prisma.sj_users.findUnique({
        where: {
          user_name: user_name,
        }, select: {
          user_name: true,
          password: true,
          first_name: true,
          last_name: true,
          is_active: true,
          profile: {
            select: {
              title: true
            }
          }
        }
      })

      if (!userCredentials){
        throw new UnauthorizedException()
      }else if(!userCredentials.is_active){
        throw new ForbiddenException()
      }

      if (!bcrypt.compareSync(password, userCredentials.password))
        throw new UnauthorizedException()

      const user = {
        userName: userCredentials.user_name,
        firstName: userCredentials.first_name,
        lastName: userCredentials.last_name,
        isActive: userCredentials.is_active,
        profile: userCredentials.profile.title
      }

      return { data: user, meta: {status: 'success', message: 'Autenticación exitosa'} };
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  private handleExceptions(error: any) {

    if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException({ errors: [{status: 401, title: 'Credenciales inválidas. Por favor intente de nuevo', detail: ''}] });

    } else if(error instanceof ForbiddenException){
      throw new ForbiddenException({ errors: [{status: 403, title: 'Acceso denegado. Contactate con un administrador', detail: ''}] });
    }

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server log')
  }

}
