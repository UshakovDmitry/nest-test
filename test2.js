async getTransportRequestsByDate(date: string): Promise<any[]> {
    try {
      // Создание пайплайна для агрегации
      const pipeline = [
        {
          $addFields: {
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$ContactInformation.Date_Time_delivery" },
            },
          },
        },
        {
          $match: {
            formattedDate: date,
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

  // ... (ваш текущий код)
}
В этом методе:

Сначала добавляется новое поле formattedDate, которое содержит дату из поля ContactInformation.Date_Time_delivery в строковом формате YYYY-MM-DD.
Далее, документы фильтруются так, чтобы в результаты попали только те, у которых значение в поле formattedDate совпадает с переданной датой.
Метод aggregate выполняет агрегацию с использованием созданного пайплайна и возвращает результаты.
Таким образом, этот метод будет возвращать все заявки, у которых дата в поле ContactInformation.Date_Time_delivery совпадает с переданной датой.





