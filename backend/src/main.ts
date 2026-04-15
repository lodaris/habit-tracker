import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // глобальна валідація для всіх ендпоінтів
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // відкидає поля яких немає в DTO
    forbidNonWhitelisted: true, // повертає помилку якщо прийшло зайве поле
    transform: true,            // автоматично перетворює типи
  }));

  await app.listen(3000);
}
bootstrap();