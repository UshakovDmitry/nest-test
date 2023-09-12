
MODULE.TS
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller'; 
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  controllers: [RabbitMQController], 
  exports: [RabbitMQService],
})
export class RabbitMQModule {}



COTROLLER.TS
import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get('read')
  async readFromQueue() {
    return await this.rabbitMQService.readFromQueue();
  }
}




SERVICE.TS
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueueMessage } from './rabbitmq.interface';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';

  constructor(private readonly httpService: HttpService) {}

  async readFromQueue(): Promise<QueueMessage> {
    try {
      const response = await this.httpService
        .post(
          'http://rabbitmq.next.local/api/queues/%2F/TmsQueue/get',
          {
            count: 1,
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            truncate: 50000,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${this.username}:${this.password}`,
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      if (response.status === 200 && response.data.length > 0) {
        const data = response.data[0];
        const payload = JSON.parse(data.payload);

        return payload;
      } else {
        throw new Error('Возникла ошибка при получении данных');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


app module
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from './transport/transport.module';
import { LoadersModule } from './loaders/loaders.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [TransportModule, LoadersModule, RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 14052  - 12.09.2023, 12:34:19     LOG [NestFactory] Starting Nest application...
[Nest] 14052  - 12.09.2023, 12:34:19   ERROR [ExceptionHandler] Nest cannot export a provider/module that is not a part of the currently processed module (RabbitMQModule). Ple
ase verify whether the exported RabbitMQService is available in this particular context.

Possible Solutions:
- Is RabbitMQService part of the relevant providers/imports within RabbitMQModule?

Error: Nest cannot export a provider/module that is not a part of the currently processed module (RabbitMQModule). Please verify whether the exported RabbitMQService is availa
ble in this particular context.

Possible Solutions:
- Is RabbitMQService part of the relevant providers/imports within RabbitMQModule?

    at Module.validateExportedProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\injector\module.js:308:19)
    at addExportedUnit (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\injector\module.js:276:67)
    at Module.addExportedProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\injector\module.js:287:9)
    at NestContainer.addExportedProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\injector\container.js:168:19)
    at DependenciesScanner.insertExportedProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\scanner.js:291:24)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\scanner.js:148:50
    at Array.forEach (<anonymous>)
    at DependenciesScanner.reflectExports (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\scanner.js:148:17)
    at DependenciesScanner.scanModulesForDependencies (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\scanner.js:101:18
)
    at DependenciesScanner.scan (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api\node_modules\@nestjs\core\scanner.js:31:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api>
