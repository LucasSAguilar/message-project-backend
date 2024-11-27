import { Injectable, ValidationPipe } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import HasNewPostsInterface from './interfaces/hasNewPosts.interface';
import ResponseAllPostsInterface from './interfaces/ResponseAllPosts.interface';
import PostDto from './dto/post.dto';
import ResponseInsertPostInterface from './interfaces/ResponseInsertPost.interface';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  async returnAllPosts(): Promise<ResponseAllPostsInterface[]> {
    const db = this.databaseService.getDb();

    const posts = await db
      .collection('posts')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return posts;
  }

  async verifyNewPosts(timestamp: string): Promise<HasNewPostsInterface> {
    try {
      const db = this.databaseService.getDb();

      console.log(new Date(timestamp) < new Date('2024-11-27T12:35:12.442Z'));

      const posts = await db
        .collection('posts')
        .find({ createdAt: { $gt: new Date(timestamp) } })
        .sort({ createdAt: -1 })
        .toArray();

      console.log(posts);

      if (posts.length > 0) {
        return {
          success: true,
          hasPost: true,
          posts,
          message: 'Há posts novos',
        };
      }

      return {
        success: true,
        hasPost: false,
        message: 'Não há posts novos',
        posts,
      };
    } catch (error) {
      return {
        success: false,
        hasPost: true,
        message: `Ocorreu um erro: ${error.message}`,
        posts: [],
      };
    }
  }

  async insertPost(newPost: PostDto): Promise<ResponseInsertPostInterface> {
    try {
      const db = this.databaseService.getDb();
      await db.collection('posts').insertOne(newPost);

      return {
        success: true,
        message: 'Post inserido com sucesso',
        post: newPost,
      };
    } catch (error) {
      console.log(`Ocorreu um erro ${error}`);
      return {
        success: false,
        message: `Ocorreu um erro: ${error.message}`,
        post: newPost,
      };
    }
  }
}
