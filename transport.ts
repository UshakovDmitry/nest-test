4

I'm trying to handle the message published on topic test_ack from online MQTT broker using microservices. But I'm getting the error.

There is no matching event handler defined in the remote service.

My Code:

main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
var url = 'mqtt://test.mosquitto.org';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.MQTT,
        options: {
            url: url
        }
    });
    await app.listenAsync();
}
bootstrap();
app.controller.ts

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor() {}

    @MessagePattern('test') 
    ackMessageTestData(data:unknown) {
        console.log(data.toString());
        return 'Message Received';
    }
}






As I don't have edit permission, I will post it as a new answer. As mentioned in the above answer. We have to use @EventPattern('test_ack').

The published message should be in format {data: 'Your message'} and should be serialized before publishing as mentioned here.

client.publish('test_ack', JSON.stringify({data: 'test data'}))




Bug Report
Current behavior
When @EventPattern is supplied with a wildcard, e.g. sensor/+/status, a There is no matching event handler defined in the remote service error is logged (similar: #2236). However, when supplying the full topic string, e.g. sensor/1/status, the event is caught as normal.

Input Code
@EventPattern('sensor/+/status')
async handleStatus(data: Record<string, string>) {
    console.log(data);
}
Expected behavior
Receiving a message with topic sensor/1/status should be handled by both handlers with pattern sensor/+/status and handlers with pattern sensor/#.

Possible Solution
When receiving an event, check for wildcards in the registered patterns, such as + and #, before matching to handlers. It might have similar solution to #2447

Environment

Nest version: 6.6.7
 
For Tooling issues:
- Node version: 10.16.0
- Platform:  Windows

Others:

@Nosfistis Nosfistis added the needs triage label on Sep 13, 2019
@hiepthai hiepthai mentioned this issue on Sep 14, 2019
feat(microservices) add matchMqttPattern to server mqtt #2954
 Merged
3 tasks
@hiepthai
This comment has been minimized.
Show comment
@wesselvdv
wesselvdv commented on Jun 12, 2020
I believe this can be closed no?

@kamilmysliwiec kamilmysliwiec closed this as completed on Jun 12, 2020
@kamilmysliwiec
Member
kamilmysliwiec commented on Jun 12, 2020
Correct @wesselvdv. This feature is already available in the framework.
