  async getDriversStatsByDate(date: string) {
    const drivers =  await this.dbService.getDriversStatsByDate(date);
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD
    );
  }

мой метод получает два массива 
Задача следующаяя:
пройтись по всем элементам geliosCars и взять поле 





PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 15120  - 17.10.2023, 12:53:49     LOG [NestFactory] Starting Nest application...
[Nest] 15120  - 17.10.2023, 12:53:49   ERROR [ExceptionHandler] Classes annotated with @Injectable(), @Catch(), and @Controller() decorato
rs must not appear in the "imports" array of a module.
Please remove "GeliosService" (including forwarded occurrences, if any) from all of the "imports" arrays.

Scope [AppModule -> DriversModule]

Error: Classes annotated with @Injectable(), @Catch(), and @Controller() decorators must not appear in the "imports" array of a module.
Please remove "GeliosService" (including forwarded occurrences, if any) from all of the "imports" arrays.

Scope [AppModule -> DriversModule]

    at DependenciesScanner.insertModule (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\sc
anner.js:92:19)
    at DependenciesScanner.insertOrOverrideModule (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nest
js\core\scanner.js:301:21)
    at DependenciesScanner.scanForModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
scanner.js:37:85)
    at DependenciesScanner.scanForModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
scanner.js:68:43)
    at DependenciesScanner.scanForModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
scanner.js:68:32)
    at DependenciesScanner.scan (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\scanner.js
:27:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\nest-factory.js:107:17
    at Function.asyncRun (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\errors\exceptions
-zone.js:22:13)
    at NestFactoryStatic.initialize (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\nest-f
actory.js:106:13)
    at NestFactoryStatic.create (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\nest-facto
ry.js:42:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
