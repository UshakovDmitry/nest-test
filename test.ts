вот как выглядит консоль когда ссобщений нет в очереди
ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-3)
$ npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 21496  - 14.09.2023, 11:54:24     LOG [NestFactory] Starting Nest application...
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [InstanceLoader] MongooseModule dependencies initialized +27ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [InstanceLoader] ClientsModule dependencies initialized +0ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +9ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [InstanceLoader] MongooseModule dependencies initialized +7ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [NestMicroservice] Nest microservice successfully started +85ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [RoutesResolver] RabbitMQController {/all-messages}: +16ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [RouterExplorer] Mapped {/all-messages, GET} route +3ms
[Nest] 21496  - 14.09.2023, 11:54:24     LOG [NestApplication] Nest application successfully started +2ms


и вот что происходит когда в очереди появляется сообщение

[Nest] 21496  - 14.09.2023, 11:55:32   ERROR [Server] There is no matching event handler defined in the remote service. Event pattern: und
efined
