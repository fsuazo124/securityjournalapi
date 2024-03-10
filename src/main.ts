import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Opciones de configuración CORS (opcional)
  const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Habilitar CORS con opciones
  app.enableCors(corsOptions);

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