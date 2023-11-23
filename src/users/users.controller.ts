import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.type';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createEventDto: CreateUserDto) {
    const { password, username } = createEventDto;
    if (username.length < 4 || password.length < 4)
      return {
        message: 'Username and password must be at least 4 characters long',
      };
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.usersService.createUser(
      username,
      hashedPassword,
    );
    return newUser;
  }
}
