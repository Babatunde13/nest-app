import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignInUser, SignUpUser, User } from './types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.model';

const bcrypt = require('bcryptjs');
const users: User[] = require('../user.json');

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService,
      @InjectModel('User') private readonly userModel: Model<IUser>
) {}

  async signInLocal(data: SignInUser) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (bcrypt.compareSync(data.password, user.password)) {
      const res: IUser & { token: string } = { ...user, token: '' };
      res.token = this.signUser(res._id, res.email, 'user');
      return res;
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async signUpLocal(data: SignUpUser) {
    const hasAccount = await this.userModel.findOne({ email: data.email });
    if (hasAccount) {
      throw new UnprocessableEntityException('Account already exist');
    }
    const user = await this.userModel.create(data)
    return user.toJSON();
  }

  signUser(userId: string, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type,
    });
  }

  decodeSignedData(token: string) {
    return this.jwtService.decode(token);
  }

  async getUsers() {
    return users.map((user) => {
      delete user.passwordHash;
      return user;
    });
  }
}
