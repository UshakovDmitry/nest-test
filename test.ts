PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

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
src/rabbitmq/rabbitmq.service.ts:25:34 - error TS2304: Cannot find name 'QueueMessage'.

25   async readFromQueue(): Promise<QueueMessage> {
                                    ~~~~~~~~~~~~
src/rabbitmq/rabbitmq.service.ts:25:34 - error TS4055: Return type of public method from exported class has or is us
ing private name 'QueueMessage'.

25   async readFromQueue(): Promise<QueueMessage> {
                                    ~~~~~~~~~~~~
src/rabbitmq/rabbitmq.service.ts:26:29 - error TS2304: Cannot find name 'QueueMessage'.

26     return this.client.send<QueueMessage, void>('get_message', {}).toPromise();
                               ~~~~~~~~~~~~
src/rabbitmq/rabbitmq.service.ts:26:64 - error TS2345: Argument of type '{}' is not assignable to parameter of type
'void'.

26     return this.client.send<QueueMessage, void>('get_message', {}).toPromise();
                                                                  ~~
src/rabbitmq/rabbitmq.service.ts:25:34 - error TS4055: Return type of public method from exported class has or is us
ing private name 'QueueMessage'.

25   async readFromQueue(): Promise<QueueMessage> {
                                    ~~~~~~~~~~~~

Found 6 error(s).
