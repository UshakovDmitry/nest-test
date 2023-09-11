import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from './transport/transport.module';
import { LoadersModule } from './loaders/loaders.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [TransportModule, LoadersModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
