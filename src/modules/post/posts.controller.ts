import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './posts.service';
import HasNewPostsInterface from './interfaces/hasNewPosts.interface';
import { AuthGuard } from '../auth/auth.guard';
import PostDto from './dto/post.dto';

// @UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  insertPost(@Body() newPost: PostDto) {
    return this.postService.insertPost(newPost);
  }

  @Get('refresh')
  async hasNewPost(
    @Query('timestamp') timestamp: string,
  ): Promise<HasNewPostsInterface> {
    if (
      !timestamp ||
      !timestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/)
    ) {
      return {
        success: false,
        hasPost: false,
        message: 'Timestamp inválido',
        posts: [],
      };
    }
    return this.postService.verifyNewPosts(timestamp);
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
