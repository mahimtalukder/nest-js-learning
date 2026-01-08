import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';


@Controller('/auth')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  //@UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    // all parameters are strings by default
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      return new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() Body: UpdateUserDto) {
    return this.userService.update(parseInt(id), Body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
