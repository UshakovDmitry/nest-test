PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 1920  - 13.09.2023, 16:04:59     LOG [NestFactory] Starting Nest application...
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [InstanceLoader] MongooseModule dependencies initialized +29ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [InstanceLoader] ClientsModule dependencies initialized +1ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +10ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [InstanceLoader] MongooseModule dependencies initialized +6ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [InstanceLoader] AppModule dependencies initialized +9ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [RoutesResolver] RabbitMQController {/all-messages}: +27ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [RouterExplorer] Mapped {/all-messages, GET} route +2ms
[Nest] 1920  - 13.09.2023, 16:04:59     LOG [NestApplication] Nest application successfully started +3ms
[Nest] 1920  - 13.09.2023, 16:04:59   ERROR [ClientProxy] Disconnected from RMQ. Trying to reconnect.
[Nest] 1920  - 13.09.2023, 16:04:59   ERROR [ClientProxy] Object:
{
  "err": {
    "code": 406,
    "classId": 50,
    "methodId": 10
  }
}


C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:133
      var closeFrameError = new Error(e);
                            ^
Error: Operation failed: QueueDeclare; 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - inequivalent ar
g 'durable' for queue 'TmsQueue' in vhost '/': received 'false' but current is 'true'"
    at reply (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.
js:133:29)
    at ConfirmChannel.C.accept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\am
qplib\lib\channel.js:416:7)
    at Connection.mainAccept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqp
lib\lib\connection.js:63:33)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\conn
ection.js:486:48)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
