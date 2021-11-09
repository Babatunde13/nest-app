import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postHello(@Body('title') prodTitle: string): { message: string } {
    return this.appService.getHello();
  }

  @Post('/post')
  createPost(@Body() body: createPost) {
    return this.appService.createPost(body);
  }
}

export interface createPost {
  title: string;
  content: string;
}
