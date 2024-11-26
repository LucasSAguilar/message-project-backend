import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthService } from '../auth/auth.service';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  controllers: [PostController],
  providers: [PostService, DatabaseService, AuthService]
})
export class PostModule {}
