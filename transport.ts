worker_processes 4;

events { worker_connections 1024; }

http {
    server {
        listen 80;
        root  /usr/share/nginx/html;
        index  index.html index.htm;
        include /etc/nginx/mime.types;

        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
            try_files $uri $uri/ /index.html;
        }
        location /api {
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_ssl_server_name on;
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header Host-Real-IP  $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-Pcol HTTP;
            proxy_intercept_errors on;
            proxy_connect_timeout 24h;
            proxy_send_timeout 24h;
            proxy_read_timeout 24h;
            
            proxy_pass http://127.0.0.1:4000;
        }
        location /swagger {
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_ssl_server_name on;
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header Host-Real-IP  $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-Pcol HTTP;
            proxy_intercept_errors on;
            
            proxy_pass http://127.0.0.1:4000;
        }

    }
}

import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './schemas/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MessageController } from './message/message.controller';
import { TransportModule } from './transport/transport.module';
import { LoadersModule } from './loaders/loaders.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    TransportModule,
    LoadersModule,
  ],
  controllers: [MessageController],
  providers: [RabbitMQService],
})
export class AppModule {}


import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('/api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Post()
  async saveMessage(@Body() messageData: any) {
    return this.messageService.saveMessage(messageData);
  }
}



http://tms.next.local/api/messages
 
<html>

<head>
	<title>502 Bad Gateway</title>
</head>

<body>
	<center>
		<h1>502 Bad Gateway</h1>
	</center>
	<hr>
	<center>nginx/1.25.1</center>
</body>

</html>

