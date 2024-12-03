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
  getOpenai() {
    return {
      success: true,
      data: 'Openai',
      message: 'OpenAI service is running',
    };
  }

  @Post('text-review')
  async textReview(@Body() body: { content: string }) {
    try {
      if (!body.content) {
        throw new HttpException(
          'Content is required in the request body',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await this.openaiService.runAI({
        content: body.content,
        aiType: 'textReview',
      });

      return {
        success: true,
        data: response,
        message: 'Text review completed successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to process text review',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('chat-modes')
  async getChatModes() {
    try {
      const chatModes = await this.openaiService.getChatModes();
      return {
        success: true,
        data: chatModes,
        message: 'Chat modes retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch chat modes',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
