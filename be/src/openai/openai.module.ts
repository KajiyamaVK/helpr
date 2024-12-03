import { Module } from '@nestjs/common';
import { OpenaiController } from './controller/openai.controller';
import { OpenaiService } from './service/openai.service';
import { OpenAIRepository } from './repository/openai.repository';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, OpenAIRepository],
})
export class OpenaiModule {}
