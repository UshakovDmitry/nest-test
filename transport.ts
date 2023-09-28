@Injectable()
export class DBService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      const existingMessage = await this.messageModel.findOne({ Number: parsedData.Number }).exec();

      if (existingMessage) {
        // Если сообщение с таким номером уже существует, обновляем его
        const updatedMessage = await this.messageModel.findOneAndUpdate({ Number: parsedData.Number }, parsedData, { new: true }).exec();
        console.log('Message updated:', updatedMessage.Number);
        return updatedMessage;
      } else {
        // Если сообщения с таким номером нет, создаем новое
        const createdMessage = new this.messageModel(parsedData);
        console.log('New message created:', createdMessage.Number);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }
}
