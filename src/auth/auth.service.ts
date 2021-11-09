import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUser, SignUpUser, User } from './types';
import { v4 as uuidV4 } from 'uuid';

const bcrypt = require('bcryptjs');
const users: User[] = require('../user.json');

@Injectable()
export class AuthService {
  async signInLocal(data: SignInUser) {
    const user = users.find((user: User) => user.email === data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (bcrypt.compareSync(data.password, user.passwordHash)) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async signUpLocal(data: SignUpUser) {
    console.log(users);
    const user = {
      ...data,
      passwordHash: bcrypt.hashSync(data.password, 10),
      _id: uuidV4(),
    };
    users.push(user);
    return user;
  }

  async getUsers() {
    return users.map(user => {
        delete user.passwordHash
        return user
    })
  }
}
