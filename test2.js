Ошибка при выполнении запроса к MongoDB: MongoServerError: PlanExecutor error during aggregation :: caused by :: can't convert from BSON type string to
 Date
    at Connection.onMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\connection.ts:413:18)
    at MessageStream.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\connection.ts:243:
56)
    at MessageStream.emit (node:events:526:28)
    at processIncomingData (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\message_stream.ts:193:12
)
    at MessageStream._write (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\message_stream.ts:74:5)
    at writeOrBuffer (node:internal/streams/writable:389:12)
    at _write (node:internal/streams/writable:330:10)
    at MessageStream.Writable.write (node:internal/streams/writable:334:10)
    at Socket.ondata (node:internal/streams/readable:754:22)
    at Socket.emit (node:events:526:28) {
  ok: 0,
  code: 16006,
  codeName: 'Location16006',
  [Symbol(errorLabels)]: Set(0) {}
}
[Nest] 14456  - 13.10.2023, 10:50:49   ERROR [ExceptionsHandler] PlanExecutor error during aggregation :: caused by :: can't convert from BSON type str
ing to Date
MongoServerError: PlanExecutor error during aggregation :: caused by :: can't convert from BSON type string to Date
    at Connection.onMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\connection.ts:413:18)
    at MessageStream.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\connection.ts:243:
56)
    at MessageStream.emit (node:events:526:28)
    at processIncomingData (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\message_stream.ts:193:12
)
    at MessageStream._write (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongodb\src\cmap\message_stream.ts:74:5)
    at writeOrBuffer (node:internal/streams/writable:389:12)
    at _write (node:internal/streams/writable:330:10)
    at MessageStream.Writable.write (node:internal/streams/writable:334:10)
    at Socket.ondata (node:internal/streams/readable:754:22)
    at Socket.emit (node:events:526:28)
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





