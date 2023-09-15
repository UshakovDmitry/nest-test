import { Injectable } from '@nestjs/common';
// ... другие импорты ...

@Injectable()
export class MessageService {
  // ... конструктор и другие методы ...

  saveMessage(data: any): any {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      const message = new MessageModel(parsedData);
      return message.save();
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}








import { Injectable } from '@nestjs/common';
// ... другие импорты ...

@Injectable()
export class RabbitMQService {
  // ... конструктор и другие методы ...

  saveMessageToDb(data: any): any {
    try {
      return this.messageService.saveMessage(data);
    } catch (error) {
      console.error('Error saving message to database:', error);
      throw error;
    }
  }
}












// ... импорты ...

// Конфигурация подключения и прослушивание очереди
// ... 

channel.consume(queueName, (msg) => {
  try {
    const data = JSON.parse(msg.content.toString());
    // ... обработка данных ...

    this.rabbitMQService.saveMessageToDb(data);
    // ... другой код ...

  } catch (error) {
    console.error('Error processing RabbitMQ message:', error);
  }
}, { noAck: true });
