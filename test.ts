PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.service.ts:1:22 - error TS2724: '"@nestjs/common"' has no exported member named 'HttpService'.
 Did you mean 'HttpServer'?

1 import { Injectable, HttpService } from '@nestjs/common';
                       ~~~~~~~~~~~
src/rabbitmq/rabbitmq.service.ts:5:54 - error TS2307: Cannot find module '../message/message.schema' or its correspo
nding type declarations.

5 import { MessageDocument, MESSAGE_SCHEMA_NAME } from '../message/message.schema';
                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~

Found 2 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
