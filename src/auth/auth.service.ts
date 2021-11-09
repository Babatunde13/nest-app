import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignInUser, SignUpUser, User } from './types';
import { v4 as uuidV4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcryptjs');
const users: User[] = require('../user.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signInLocal(data: SignInUser) {
    const user = users.find((user) => user.email === data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (bcrypt.compareSync(data.password, user.passwordHash)) {
      const res: User & { token: string } = { ...user, token: '' };
      delete res.passwordHash;
      res.token = this.signUser(res._id, res.email, 'user');
      return res;
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async signUpLocal(data: SignUpUser) {
    const hasAccount = users.find((user) => user.email === data.email);
    if (hasAccount) {
      throw new UnprocessableEntityException('Account already exist');
    }
    const user = {
      ...data,
      passwordHash: bcrypt.hashSync(data.password, 10),
      _id: uuidV4(),
    };
    delete user.password;
    users.push(user);
    const res = { ...user };
    delete res.passwordHash;
    return res;
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
