import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

process.env.SWAGGER_USER = 'tms';
process.env.SWAGGER_PASSWORD = '123456789';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // -- SWAGGER -- //
  app.use(
    ['/swagger', '/swagger-stats'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Описание всех контроллеров REST API')
    .setDescription(
      'Внимание! Некоторые методы могут изменять данные в базе данных!',
    )
    .setVersion('1.0')
    .addTag('API для TMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // -- CORS -- //
  app.enableCors();
  // -- COMPRESS -- //
  app.use(compression());

  await app.startAllMicroservicesAsync();
  // -- LISTEN -- //
  await app.listen(4000);
}
bootstrap();
