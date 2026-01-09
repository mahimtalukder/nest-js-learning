import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    //This is a key set via developer
    keys: ["afensakuele3r43efdks"]
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      // only allow properties that are defined in the DTOs
      whitelist: true
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
