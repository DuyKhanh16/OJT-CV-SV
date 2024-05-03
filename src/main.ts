import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

require('dotenv').config();
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();


  //Swagger
  const options = new DocumentBuilder()
  .setTitle('Doc API Project demo')
  .setDescription('My doc API description')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-docs', app, document);
  await app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
