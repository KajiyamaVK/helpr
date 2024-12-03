import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class OpenAIRepository implements OnApplicationShutdown {
  private db: Db;
  private client: MongoClient;

  constructor() {
    this.initializeDbConnection();
  }

  private async initializeDbConnection() {
    try {
      this.client = await MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING,
      );
      this.db = this.client.db();
      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async onApplicationShutdown() {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }

  async getChatModes(): Promise<string[]> {
    try {
      const collection = this.db.collection('chatModes');
      const result = await collection.findOne({});
      return result?.modes || [];
    } catch (error) {
      console.error('Error fetching chat modes:', error);
      throw error;
    }
  }
}
