PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.module.ts:9:19 - error TS2511: Cannot create an instance of an abstract class.

  9     this.client = new ClientProxy({
                      ~~~~~~~~~~~~~~~~~
 10       transport: Transport.RMQ,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
 15       },
    ~~~~~~~~
 16     });
    ~~~~~~
src/rabbitmq/rabbitmq.service.ts:11:19 - error TS2350: Only a void function can be called with the 'new' keyword.

 11     this.client = new Client({
                      ~~~~~~~~~~~~
 12       transport: Transport.RMQ,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
 21       },
    ~~~~~~~~
 22     });
    ~~~~~~
src/rabbitmq/rabbitmq.service.ts:26:55 - error TS2345: Argument of type '{}' is not assignable to parameter of type
'void'.

26     return this.client.send<any, void>('get_message', {}).toPromise();
                                                         ~~

Found 3 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
