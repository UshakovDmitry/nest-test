PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 2944  - 13.09.2023, 12:59:41     LOG [NestFactory] Starting Nest application...
[Nest] 2944  - 13.09.2023, 12:59:41     LOG [InstanceLoader] DatabaseModule dependencies initialized +29ms
[Nest] 2944  - 13.09.2023, 12:59:41     LOG [InstanceLoader] TypeOrmModule dependencies initialized +1ms
[Nest] 2944  - 13.09.2023, 12:59:41   ERROR [ExceptionHandler] Nest can't resolve dependencies of the MessageModel (
?). Please make sure that the argument DatabaseConnection at index [0] is available in the MongooseModule context.

Potential solutions:
- Is MongooseModule a valid NestJS module?
- If DatabaseConnection is a provider, is it part of the current MongooseModule?
- If DatabaseConnection is exported from a separate @Module, is that module imported within MongooseModule?
  @Module({
    imports: [ /* the Module containing DatabaseConnection */ ]
  })

Error: Nest can't resolve dependencies of the MessageModel (?). Please make sure that the argument DatabaseConnectio
n at index [0] is available in the MongooseModule context.

Potential solutions:
- Is MongooseModule a valid NestJS module?
- If DatabaseConnection is a provider, is it part of the current MongooseModule?
- If DatabaseConnection is exported from a separate @Module, is that module imported within MongooseModule?
  @Module({
    imports: [ /* the Module containing DatabaseConnection */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend
\node_modules\@nestjs\core\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_
modules\@nestjs\core\injector\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
injector\injector.js:128:38)
    at async Promise.all (index 0)
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
