import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('API de Gerenciamento de Tarefas')
  .setDescription('API REST para gerenciamento de tarefas construída com NestJS e TypeScript, seguindo os princípios de arquitetura modular, separação de responsabilidades e boas práticas recomendadas pelo framework.')
  .setVersion('1.0')
  .addTag('tasks')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 55555);
}
bootstrap();
