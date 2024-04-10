import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() user: UserDto) {
    return this.userService.create(user);
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto): Promise<any> {
    const { email, password } = user;
    return this.userService.login(email, password);
  }
}
