import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { DatabaseService } from './modules/database/database.service';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AuthModule, MessageModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
