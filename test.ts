PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start


C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\reflect-metadata\Reflect.js:553
                var decorated = decorator(target, propertyKey, descriptor);
                                ^
Error: Cannot determine a type for the "Message.ContactInformation" field (union/intersection/ambiguous type was use
d). Make sure your property is decorated with a "@Prop({ type: TYPE_HERE })" decorator.
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\mongoose\dist\decor
ators\prop.decorator.js:21:23
    at DecorateProperty (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\reflect-m
etadata\Reflect.js:553:33)
    at Reflect.decorate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\reflect-m
etadata\Reflect.js:123:24)
    at __decorate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\dist\database\message.entity
.js:4:92)
    at Object.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\database\message
.entity.ts:36:3)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
