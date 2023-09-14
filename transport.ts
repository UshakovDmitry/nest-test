import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
          queue: 'TmsQueue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
})
export class AppModule {}




ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-3)
$ npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 19560  - 14.09.2023, 14:30:46     LOG [NestFactory] Starting Nest application...
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] MongooseModule dependencies initialized +27ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] ClientsModule dependencies initialized +0ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +11ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] MongooseModule dependencies initialized +11ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] MessageModule dependencies initialized +0ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] RabbitMQModule dependencies initialized +1ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [NestMicroservice] Nest microservice successfully started +103ms
Microservices started
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [RoutesResolver] RabbitMQController {/all-messages}: +15ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [RouterExplorer] Mapped {/all-messages, GET} route +3ms
[Nest] 19560  - 14.09.2023, 14:30:46     LOG [NestApplication] Nest application successfully started +2ms
Application is listening on port 4000
[Nest] 19560  - 14.09.2023, 14:36:27   ERROR [Server] There is no matching event handler defined in the remote service. Event pa
ttern: undefined
