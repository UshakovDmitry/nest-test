В файле listener-rabbitMQ:

channel.consume(
    queue,
    function (msg: any) {
      const messageObj = JSON.parse(msg.content.toString());
      console.log('Сообщение из TmsQueue', messageObj);
      messageSubject.notifyObservers(messageObj);
    },
    {
      noAck: true,
    },
);


В вашем message.service, вы уже делаете проверку:

const parsedData =
    typeof messageData === 'string' ? JSON.parse(messageData) : messageData;



В файле message.shema:

export const MessageSchema = new Schema({
  // ... остальные поля ...
}, { versionKey: false });
