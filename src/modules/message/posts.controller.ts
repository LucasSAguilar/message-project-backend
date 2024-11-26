import { Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { PostService } from './posts.service';
import { AuthService } from '../auth/auth.service';

@Controller('message')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  insertMessage() {
    return 'Post inserted';
  }

  @Get('refresh')
  hasNewPost(@Query('timestamp') timestamp: string) {
    return 'You have a new post';
  }

  @Get('all')
  async getAllPosts(@Headers('Authorization') token: string) {
    token = token.split(' ')[1];

    const responseToken = this.authService.verifyToken(token);

    if (!responseToken.success) {
      return { ...responseToken, posts: [] };
    }

    const response = await this.postService.returnAllPosts();
    return response;
  }
}
