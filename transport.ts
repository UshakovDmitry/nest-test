
  @EventPattern()
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Получено сообщение:', originalMsg);

    try {
      if (data && data.data) {
        console.log('Сообщение получено:', data.data);
        await this.messageService.create(data.data);
        console.log('Сообщение сохранено');
        channel.ack(originalMsg);
      } else {
        console.error('Некорректный формат сообщения');
      }
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  }




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
