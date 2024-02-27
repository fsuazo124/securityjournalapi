import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Prefijo de las rutas 
  app.setGlobalPrefix('sj/api')
  
  //Validacion de Pipes Global
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );
  
  //
  await app.listen(process.env.API_PORT);
}
bootstrap();