import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async returnAllMessages() {
    const db = this.databaseService.getDb();

    const messages = await db.collection('messages').find().toArray();

    return messages;
  }
}
