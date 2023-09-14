PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 1804  - 14.09.2023, 17:36:05     LOG [NestFactory] Starting Nest application...
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [InstanceLoader] RabbitMqModule dependencies initialized +1ms
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [InstanceLoader] DiscoveryModule dependencies initialized +0ms
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
[Nest] 1804  - 14.09.2023, 17:36:05   ERROR [AmqpConnection] Disconnected from RabbitMQ broker (default)
Error: Channel closed by server: 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - inequivalent arg 'type' for exchange 'TmsExchange' in vhost '/': received 'topic' but current is 'direct'"
    at ConfirmChannel.C.accept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:422:17)
    at Connection.mainAccept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:64:33)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:478:48)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
[Nest] 1804  - 14.09.2023, 17:36:05     LOG [AmqpConnection] Failed to setup a RabbitMQ channel - name: AmqpConnection / error: Channel ended, no reply will be forthcoming Error: Channel ended, no reply will
be forthcoming
    at rej (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:201:7)
    at ConfirmChannel.C._rejectPending (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:207:42)
    at ConfirmChannel.C.toClosed (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:171:8)
    at Connection.C._closeChannels (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:394:18)
    at Connection.C.toClosed (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:401:8)
    at Connection.C.onSocketError (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:355:10)
    at Connection.emit (node:events:526:28)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:481:12)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
Unhandled rejection Error: Operation failed: ExchangeDeclare; 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - inequivalent arg 'type' for exchange 'TmsExchange' in vhost '/': received 'topic' bu
t current is 'direct'"
    at reply (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:134:29)
    at ConfirmChannel.C.accept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:417:7)
    at Connection.mainAccept [as accept] (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:64:33)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:478:48)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)

[Nest] 1804  - 14.09.2023, 17:36:10   ERROR [ExceptionHandler] Failed to connect to a RabbitMQ broker within a timeout of 5000ms
Error: Failed to connect to a RabbitMQ broker within a timeout of 5000ms
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\src\amqp\connection.ts:193:17
    at Observable.init [as _subscribe] (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\observable\throwError.ts:123:68)
    at Observable._trySubscribe (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:244:19)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:234:18
    at Object.errorContext (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\util\errorContext.ts:29:5)
    at Observable.subscribe (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:220:5)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\operators\timeout.ts:354:15
    at AsyncAction.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\util\executeSchedule.ts:27:5)
    at AsyncAction._execute (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncAction.ts:120:12)
    at AsyncAction.execute (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncAction.ts:95:24)
    at AsyncScheduler.flush (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncScheduler.ts:40:27)
    at listOnTimeout (node:internal/timers:559:17)
    at processTimers (node:internal/timers:502:7)
