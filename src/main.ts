import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();


  const port = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);
  app.enableCors();
}
bootstrap();
