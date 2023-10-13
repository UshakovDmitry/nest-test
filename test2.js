async getTransportRequestsByDate(date: string): Promise<any[]> {
    try {
      // Создание пайплайна для агрегации
      const pipeline = [
        {
          $match: {
            "ContactInformation.Date_Time_delivery": {
              $regex: new RegExp(`^${date}`), // Соответствие строке, начинающейся с переданной даты
            },
          },
        },
      ];

      // Выполнение агрегации с использованием созданного пайплайна
      const results = await this.messageModel.aggregate(pipeline).exec();
      return results;
    } catch (error) {
      console.error('Ошибка при выполнении запроса к MongoDB:', error);
      throw error;
    }
  }


