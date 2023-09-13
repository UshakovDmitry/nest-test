PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.module.ts:28:18 - error TS2724: '"@nestjs/common"' has no exported member named 'HttpModule'.
Did you mean 'HttpCode'?

28 import { Module, HttpModule } from '@nestjs/common';
                    ~~~~~~~~~~

  node_modules/@nestjs/common/decorators/http/http-code.decorator.d.ts:11:25
    11 export declare function HttpCode(statusCode: number): MethodDecorator;
                               ~~~~~~~~
    'HttpCode' is declared here.

Found 1 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
