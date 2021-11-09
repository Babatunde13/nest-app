import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import envs from 'src/envs';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.JWT_SECRET
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
