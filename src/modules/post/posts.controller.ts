import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './posts.service';
import HasNewPostsInterface from './interfaces/hasNewPosts.interface';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  insertPost() {
    return 'Post inserted';
  }

  @Get('refresh')
  async hasNewPost(
    @Query('timestamp') timestamp: string,
  ): Promise<HasNewPostsInterface> {
    if (!timestamp || !timestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/)) {
      return {
        success: false,
        hasPost: false,
        posts: [],
      };
    }
    

    return this.postService.VerifyNewPosts(timestamp);
  }

  @Get('all')
  async getAllPosts() {
    try {
      const response = await this.postService.returnAllPosts();
      return response;
    } catch (error) {
      return error;
    }
  }
}
