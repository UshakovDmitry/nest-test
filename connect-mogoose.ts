PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 15444  - 07.11.2023, 10:58:45     LOG [NestFactory] Starting Nest application...
[Nest] 15444  - 07.11.2023, 10:58:45     LOG [InstanceLoader] MongooseModule dependencies initialized +32ms
[Nest] 15444  - 07.11.2023, 10:58:45     LOG [InstanceLoader] HttpModule dependencies initialized +1ms
[Nest] 15444  - 07.11.2023, 10:58:45   ERROR [ExceptionHandler] Nest can't resolve dependencies of the TransportRequestsService (MessageModel,
 ?, HttpService, DBService). Please make sure that the argument DispatcherActionModel at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If DispatcherActionModel is a provider, is it part of the current AppModule?
- If DispatcherActionModel is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing DispatcherActionModel */ ]
  })

Error: Nest can't resolve dependencies of the TransportRequestsService (MessageModel, ?, HttpService, DBService). Please make sure that the ar
gument DispatcherActionModel at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If DispatcherActionModel is a provider, is it part of the current AppModule?
- If DispatcherActionModel is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing DispatcherActionModel */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core
\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injec
tor\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:128:3
8)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injec
tor\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector
.js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector
.js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 3)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\co
re\injector\instance-loader.js:55:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
