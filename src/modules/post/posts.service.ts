import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import HasNewPostsInterface from './interfaces/hasNewPosts.interface';
import ResponseAllPostsInterface from './interfaces/ResponseAllPosts.interface';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  async returnAllPosts(): Promise<ResponseAllPostsInterface[]> {
    const db = this.databaseService.getDb();
    const posts = await db.collection('posts').find().toArray();
    return posts;
  }

  async VerifyNewPosts(timestamp: string): Promise<HasNewPostsInterface> {
    try {
      const db = this.databaseService.getDb();
      const posts = await db
        .collection('posts')
        .find({ timestamp: { $gt: timestamp } })
        .toArray();

      if (posts.length > 0) {
        return { success: true, hasPost: true, posts };
      }

      return { success: true, hasPost: false, posts };
    } catch (error) {
      return {
        success: false,
        hasPost: true,
        posts: [],
      };
    }
  }
}
