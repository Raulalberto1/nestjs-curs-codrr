import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan'
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'))

  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion:true
    }
  }))

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const configService = app.get(ConfigService)

  app.enableCors(CORS)
  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
    .setTitle('Task API ')
    .setDescription('Aplicación de gestón de tarea')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`)
}
bootstrap();
