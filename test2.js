https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 16252  - 27.10.2023, 12:18:07     LOG [NestFactory] Starting Nest application...
[Nest] 16252  - 27.10.2023, 12:18:07     LOG [InstanceLoader] MongooseModule dependencies initialized +30ms
[Nest] 16252  - 27.10.2023, 12:18:07     LOG [InstanceLoader] HttpModule dependencies initialized +0ms
[Nest] 16252  - 27.10.2023, 12:18:07   ERROR [ExceptionHandler] Nest can't resolve dependencies of the TransportRequestsService (MessageModel,
?, DBService). Please make sure that the argument HttpService at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If HttpService is a provider, is it part of the current AppModule?
- If HttpService is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

Error: Nest can't resolve dependencies of the TransportRequestsService (MessageModel, ?, DBService). Please make sure that the argument HttpSer
vice at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If HttpService is a provider, is it part of the current AppModule?
- If HttpService is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\inject
or\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:128:38
)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\inject
or\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.
js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.
js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 3)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\cor
e\injector\instance-loader.js:55:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
