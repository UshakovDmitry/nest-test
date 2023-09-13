PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.service.ts:14:9 - error TS2552: Cannot find name 'response'. Did you mean 'Response'?

14     if (response.status === 200 && response.data.length > 0) {
           ~~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:18813:13
    18813 declare var Response: {
                      ~~~~~~~~
    'Response' is declared here.
src/rabbitmq/rabbitmq.service.ts:14:36 - error TS2552: Cannot find name 'response'. Did you mean 'Response'?

14     if (response.status === 200 && response.data.length > 0) {
                                      ~~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:18813:13
    18813 declare var Response: {
                      ~~~~~~~~
    'Response' is declared here.
src/rabbitmq/rabbitmq.service.ts:15:20 - error TS2552: Cannot find name 'response'. Did you mean 'Response'?

15       const data = response.data[0];
                      ~~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:18813:13
    18813 declare var Response: {
                      ~~~~~~~~
    'Response' is declared here.

Found 3 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
