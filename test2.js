// Метод для добавления записи о коррекции
  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const userAction = await this.historyModel.findOne({ name }).exec();

    if (userAction) {
      // Если пользователь найден, добавляем запись в correctionHistory
      userAction.correctionHistory.push({ time, comment });
      await userAction.save();
      return { status: 'success', message: 'Коррекция успешно записана в историю' };
    } else {
      // Если пользователь не найден, можно выбросить исключение или вернуть статус ошибки
      throw new Error('Пользователь не найден');
    }
  }
