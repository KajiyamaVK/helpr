import { Injectable } from '@nestjs/common';
import OpenAI from 'openai/index.js';
import { credentials } from '../utils/credentials';
import { textReview } from '../chats/textReview';
import { OpenAIRepository } from '../repository/openai.repository';

@Injectable()
export class OpenaiService {
  constructor(private readonly openAIRepository: OpenAIRepository) {}

  async runAI({
    content,
    model = 'gpt-4o',
    aiType,
  }: RunningAI): Promise<string> {
    const openai = new OpenAI(credentials);
    let messages = [];

    switch (aiType) {
      case 'textReview':
        messages = textReview(content);
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages,
    });

    return completion.choices[0].message.content;
  }

  async getChatModes(): Promise<string[]> {
    try {
      return await this.openAIRepository.getChatModes();
    } catch (error) {
      throw new Error(`Failed to fetch chat modes: ${error.message}`);
    }
  }
}

interface RunningAI {
  content: string;
  model?: string;
  aiType: string;
}
