import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation in runtime because type script removes at run time in nest it validate only in compile time, to validate in runtime we use class validator and class transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }))

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
