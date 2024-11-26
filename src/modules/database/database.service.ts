import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: any;

  async onModuleInit() {
    const uri = process.env.DB_CONNECTION_STRING;
    
    if (!uri) {
      throw new Error('DB_CONNECTION_STRING is not defined in environment variables');
    }

    this.client = new MongoClient(uri);
    
    await this.client.connect();
    this.db = this.client.db();
    
  }

  getDb() {
    return this.db;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      console.log('Conexão com MongoDB fechada');
    }
  }
}
