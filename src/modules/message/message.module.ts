import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, DatabaseService]
})
export class MessageModule {}
