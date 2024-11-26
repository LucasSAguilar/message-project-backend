import { Controller, Get, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  
  constructor(private readonly messageService: MessageService) {}
  
    @Post()
  insertMessage() {
    return 'Message inserted';
  }

  @Get("refresh")
  hasNewMessage(@Query('timestamp') timestamp: string) {
    return 'You have a new message';
  }

  @Get('all')
  async getAllMessages() {
    const response = await this.messageService.returnAllMessages();
    return response;
  }

}
