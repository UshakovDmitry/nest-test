  @Post('call')
  async addCall(
    @Body() callData: { name: string; date: string; tel_number: string },
    @Res() response
  ) {
    try {
      await this.historyService.addCallHistory(callData.name, {
        date: callData.date,
        tel_number: callData.tel_number,
      });
      return response.status(HttpStatus.OK).json({
        message: "Звонок успешно записан в БД"
      });
    } catch (error) {
      // Обработка ошибок, например, если не удалось найти пользователя или сохранить данные
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Произошла ошибка при записи звонка"
      });
    }
  }







// ... существующий код ...

async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
  const userAction = await this.historyModel.findOne({ name }).exec();
  if (userAction) {
    userAction.callHistory.push(callData);
    await userAction.save();
    return true; // Указываем, что операция прошла успешно
  } else {
    // Здесь можете выбросить исключение или вернуть false
    throw new Error('Пользователь не найден');
  }
}
