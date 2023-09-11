PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api> npm run start

> tsm-api@0.0.1 start
> nest start

src/app.module.ts:6:10 - error TS2724: '"./rabbitmq/rabbitmq.module"' has no exported member named 'RabbitmqModule'. Did you mean 'RabbitMQModule'?

6 import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
           ~~~~~~~~~~~~~~

  src/rabbitmq/rabbitmq.module.ts:12:14
    12 export class RabbitMQModule {}
                    ~~~~~~~~~~~~~~
    'RabbitMQModule' is declared here.

Found 1 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api>
