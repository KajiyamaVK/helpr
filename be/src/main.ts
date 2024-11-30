import { NestFactory } from '@nestjs/core';
import { OpenaiModule } from './openai/openai.module';

async function bootstrap() {
  const app = await NestFactory.create(OpenaiModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`Server is running on ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
