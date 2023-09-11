PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api> npm run start

> tsm-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.controller.ts:2:10 - error TS2724: '"./rabbitmq.service"' has no exported member named 'RabbitMQService'. Did you mean 'RabbitmqService'?

2 import { RabbitMQService } from './rabbitmq.service';
           ~~~~~~~~~~~~~~~

  src/rabbitmq/rabbitmq.service.ts:5:14
    5 export class RabbitmqService {
                   ~~~~~~~~~~~~~~~
    'RabbitmqService' is declared here.
src/rabbitmq/rabbitmq.module.ts:2:10 - error TS2724: '"./rabbitmq.service"' has no exported member named 'RabbitMQService'. Did you mean 'RabbitmqService'?

2 import { RabbitMQService } from './rabbitmq.service';
           ~~~~~~~~~~~~~~~

  src/rabbitmq/rabbitmq.service.ts:5:14
    5 export class RabbitmqService {
                   ~~~~~~~~~~~~~~~
    'RabbitmqService' is declared here.
src/rabbitmq/rabbitmq.service.ts:1:22 - error TS2724: '"@nestjs/common"' has no exported member named 'HttpService'. Did you mean 'HttpServer'?

1 import { Injectable, HttpService } from '@nestjs/common';
                       ~~~~~~~~~~~

Found 3 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api>
