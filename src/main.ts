import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation in runtime because type script removes types at run time in nestjs it validate types only in compile time, to validate types in runtime we use class validator and class transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }))

  // here we are enabling the lifecycle event
  app.enableShutdownHooks();
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
