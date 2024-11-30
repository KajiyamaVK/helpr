import { Injectable } from '@nestjs/common';
import OpenAI from 'openai/index.js';
import { credentials } from '../utils/credentials';
import { textReview } from '../chats/textReview';

@Injectable()
export class OpenaiService {
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
}

interface RunningAI {
  content: string;
  model?: string;
  aiType: aiType;
}

type aiType = 'textReview';
