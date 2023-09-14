$ npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 22996  - 14.09.2023, 12:26:02     LOG [NestFactory] Starting Nest application...
[Nest] 22996  - 14.09.2023, 12:26:02     LOG [InstanceLoader] MongooseModule dependencies initialized +27ms
[Nest] 22996  - 14.09.2023, 12:26:02     LOG [InstanceLoader] ClientsModule dependencies initialized +0ms
[Nest] 22996  - 14.09.2023, 12:26:02   ERROR [ExceptionHandler] Nest can't resolve dependencies of the MessageService (?). Please make sur
e that the argument MessageModel at index [0] is available in the RabbitMQModule context.

Potential solutions:
- Is RabbitMQModule a valid NestJS module?
- If MessageModel is a provider, is it part of the current RabbitMQModule?
- If MessageModel is exported from a separate @Module, is that module imported within RabbitMQModule?
  @Module({
    imports: [ /* the Module containing MessageModel */ ]
  })

Error: Nest can't resolve dependencies of the MessageService (?). Please make sure that the argument MessageModel at index [0] is availabl
e in the RabbitMQModule context.

Potential solutions:
- Is RabbitMQModule a valid NestJS module?
- If MessageModel is a provider, is it part of the current RabbitMQModule?
- If MessageModel is exported from a separate @Module, is that module imported within RabbitMQModule?
  @Module({
    imports: [ /* the Module containing MessageModel */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\
core\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\i
njector\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:1
28:38)
    at async Promise.all (index 0)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\i
njector\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\inje
ctor.js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\inje
ctor.js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 4)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestj
s\core\injector\instance-loader.js:55:9)

ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-3)
$
