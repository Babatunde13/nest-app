import { Injectable } from '@nestjs/common';
import { createPost } from './app.controller';

@Injectable()
export class AppService {
  getHello(name?: string): { message: string } {
    return {
      message: name ? `Hello ${name}` : 'Hello World!',
    };
  }

  createPost(post: createPost) {
    return {
      post: {
        ...post,
        _id: '',
      },
    };
  }
}
