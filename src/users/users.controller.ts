import { CreateProfileDTO } from './dto/create-profile.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/profile')
  create(@Body() createProfileDTO: CreateProfileDTO) {
    return this.usersService.createProfile(createProfileDTO);
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/profile')
  findAllProfile() {
    return this.usersService.findAllProfile();
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Patch('/disabled/:id')
  disabledUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.disabledUser(+id);
  }

  @Patch('/enabled/:id')
  enabledUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.enabledUser(+id);
  }

}
