import {
  Body,
  Controller,
  Post,
  Get,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUser, SignUpUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signInLocal(@Body() data: SignInUser) {
    if (!data.email || !data.password) {
      throw new UnprocessableEntityException('email and password are required');
    }
    return await this.authService.signInLocal(data);
  }

  @Post('/signup')
  async signUpLocal(@Body() data: SignUpUser) {
    if (!data.email || !data.password || !data.name) {
      throw new UnprocessableEntityException(
        'email, name and password are required',
      );
    }
    return await this.authService.signUpLocal(data);
  }

  @Get()
  getUsers() {
    return this.authService.getUsers();
  }
}
