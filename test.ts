PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 22940  - 13.09.2023, 12:54:30     LOG [NestFactory] Starting Nest application...
[Nest] 22940  - 13.09.2023, 12:54:30     LOG [InstanceLoader] TypeOrmModule dependencies initialized +42ms
[Nest] 22940  - 13.09.2023, 12:54:30   ERROR [ExceptionHandler] Nest can't resolve dependencies of the RabbitMQServi
ce (HttpService, ?). Please make sure that the argument MessageRepository at index [1] is available in the RabbitMQM
odule context.

Potential solutions:
- Is RabbitMQModule a valid NestJS module?
- If MessageRepository is a provider, is it part of the current RabbitMQModule?
- If MessageRepository is exported from a separate @Module, is that module imported within RabbitMQModule?
  @Module({
    imports: [ /* the Module containing MessageRepository */ ]
  })

Error: Nest can't resolve dependencies of the RabbitMQService (HttpService, ?). Please make sure that the argument M
essageRepository at index [1] is available in the RabbitMQModule context.

Potential solutions:
- Is RabbitMQModule a valid NestJS module?
- If MessageRepository is a provider, is it part of the current RabbitMQModule?
- If MessageRepository is exported from a separate @Module, is that module imported within RabbitMQModule?
  @Module({
    imports: [ /* the Module containing MessageRepository */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend
\node_modules\@nestjs\core\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_
modules\@nestjs\core\injector\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
injector\injector.js:128:38)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_
modules\@nestjs\core\injector\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nes
tjs\core\injector\injector.js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nes
tjs\core\injector\injector.js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\insta
nce-loader.js:56:13
    at async Promise.all (index 3)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backe
nd\node_modules\@nestjs\core\injector\instance-loader.js:55:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
