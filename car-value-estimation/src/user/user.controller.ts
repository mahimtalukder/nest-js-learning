import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';


@Controller('/auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/me')
  whoAmI(@Session() session:any){
    return this.userService.findOne(session.userId);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any){
    session.userId = null;
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
