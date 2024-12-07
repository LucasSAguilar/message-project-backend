import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: any;

  async onModuleInit() {
    try {
      const uri = process.env.DB_CONNECTION_STRING;
      this.client = new MongoClient(uri);
      await this.client.connect();
      this.db = this.client.db();
    } catch (error: any) {
      throw new Error('Ocorreu um erro ao inicializar o banco de dados');
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Banco de dados não inicializado. Verifique a conexão.');
    }
    return this.db;
  }

  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.close();
      } catch (error) {
        throw new Error('Erro durante o encerramento do banco de dados.');
      }
    } else {
      console.warn('Conexão inexistente');
    }
  }
}
