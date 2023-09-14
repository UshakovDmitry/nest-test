PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 23760  - 14.09.2023, 17:25:50     LOG [NestFactory] Starting Nest application...
[Nest] 23760  - 14.09.2023, 17:25:50     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 23760  - 14.09.2023, 17:25:50     LOG [InstanceLoader] AppModule dependencies initialized +11ms
[Nest] 23760  - 14.09.2023, 17:25:50     LOG [InstanceLoader] RabbitMqModule dependencies initialized +0ms
[Nest] 23760  - 14.09.2023, 17:25:50     LOG [InstanceLoader] DiscoveryModule dependencies initialized +1ms
[Nest] 23760  - 14.09.2023, 17:25:50   ERROR [AmqpConnection] Disconnected from RabbitMQ broker (default)
Error: connect ECONNREFUSED 127.0.0.1:5672
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)
[Nest] 23760  - 14.09.2023, 17:25:55   ERROR [ExceptionHandler] Failed to connect to a RabbitMQ broker within a timeout of 5000ms
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
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
