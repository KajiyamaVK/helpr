import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OpenaiService } from '../service/openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get()
  getOpenai(): string {
    return 'Openai';
  }

  @Post('text-review')
  async textReview(@Body() body: { content: string }) {
    console.log('Received body:', body);
    console.log('Content type:', typeof body.content);

    if (!body.content) {
      throw new Error('Content is required in the request body');
    }

    const response = await this.openaiService.runAI({
      content: body.content,
      aiType: 'textReview',
    });
    return {
      message: response,
      statusCode: 200,
    };
  }

  @Get('chat-modes')
  async getChatModes() {
    try {
      const chatModes = await this.openaiService.getChatModes();
      return { chatModes };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch chat modes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
