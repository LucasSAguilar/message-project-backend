import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  async returnAllPosts() {
    const db = this.databaseService.getDb();

    const posts = await db.collection('posts').find().toArray();

    return posts;
  }
}
