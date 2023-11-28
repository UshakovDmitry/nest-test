2023-11-28 13:33:30.828	
Обновил сообщение: №№00172532
2023-11-28 13:33:30.815	
  Number: '№№00172532',
2023-11-28 13:33:30.815	
    Number: '№№00172532',
2023-11-28 12:03:15.743	
Обновил сообщение: №№00172532
2023-11-28 12:03:15.726	
  Number: '№№00172532',
2023-11-28 12:03:15.726	
    Number: '№№00172532',
2023-11-28 12:02:59.836	
Обновил сообщение: №№00172532
2023-11-28 12:02:59.818	
  Number: '№№00172532',
2023-11-28 12:02:59.818	
    Number: '№№00172532',
2023-11-28 11:46:34.294	
Новое сообщение в бд: №№00172532
2023-11-28 11:46:34.283	
  Number: '№№00172532',
2023-11-28 11:46:34.283	
    Number: '№№00172532',
2023-11-28 11:46:34.280	
Новое сообщение в бд: №№00172532
2023-11-28 11:46:34.271	
  Number: '№№00172532',
2023-11-28 11:46:34.270	
    Number: '№№00172532',


вот логи из граффана


вот функция сохранения новых сообщений в базу данных
  async saveMessage(messageData: any) {
    try {
    
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      if (parsedData.IdYandex !== '') {
        parsedData.distribution = true;
      } else {
        parsedData.distribution = false;
      }

      const existingMessage = await this.messageModel
        .findOne({ Number: parsedData.Number })
        .exec();

      if (existingMessage) {
        //Слушаем изменения в бд
        this.dataChangeSubject.next();
        // Если сообщение с таким номером уже существует, обновляем его
        const updatedMessage = await this.messageModel
          .findOneAndUpdate({ Number: parsedData.Number }, parsedData, {
            new: true,
          })
          .exec();
        console.log('Обновил сообщение:', updatedMessage.Number);
        return updatedMessage;
      } else {
        //Слушаем изменения в бд
        this.dataChangeSubject.next();
        // Если сообщения с таким номером нет, создаем новое
        const createdMessage = new this.messageModel(parsedData);
        console.log('Новое сообщение в бд:', createdMessage.Number);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

почему там появился дубликат?
