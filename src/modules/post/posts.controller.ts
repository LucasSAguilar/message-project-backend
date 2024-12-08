import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './posts.service';
import HasNewPostsInterface from './interfaces/hasNewPosts.interface';
import PostDto from './dto/post.dto';
import ResponseAllPostsInterface from './interfaces/ResponseAllPosts.interface';
import ResponseInsertPostInterface from './interfaces/ResponseInsertPost.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  insertPost(@Body() newPost: PostDto): Promise<ResponseInsertPostInterface> {
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
        ok: false,
        hasPost: false,
        message: 'Timestamp inválido',
        posts: [],
      };
    }
    return this.postService.verifyNewPosts(timestamp);
  }

  @Get('all')
  async getAllPosts(): Promise<ResponseAllPostsInterface> {
    return await this.postService.returnAllPosts();
  }
}
