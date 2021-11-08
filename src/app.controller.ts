import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postHello(@Body('title') prodTitle: string): { message: string } {
    console.log(prodTitle);
    return this.appService.getHello();
  }

  @Post('/post')
  createPost(@Body() body: createPost) {
    console.log(body);
    return this.appService.createPost(body);
  }

  // @Get('/:username')
  // getHello(
  //   @Param('username') username: string,
  //   @Query('name') name: string
  // ): { message: string } {
  //   console.log(username, name);
  //   return this.appService.getHello(name);
  // }
}

export interface createPost {
  title: string;
  content: string;
}
