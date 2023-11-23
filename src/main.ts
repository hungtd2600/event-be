import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  dotenv.config();

  const port = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(port);
  app.enableCors();
}
bootstrap();
