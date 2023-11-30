  @Post('byDateRange')
  async getTransportRequestsByDateRange(
    @Body() dto: GetTransportRequestsByDateRangeDto,
  ) {
    return this.transportRequestsService.getTransportRequestsByDateRange(
      dto.startDate,
      dto.endDate,
    );
  }

export class GetTransportRequestsByDateRangeDto {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;
}

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    return await this.dbService.getTransportRequestsByDateRange(
      startDate,
      endDate,
    );
  }

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    // Преобразование дат из строки в объект Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Поиск заявок в базе данных, где Date_Time_delivery находится в диапазоне между startDate и endDate
    return await this.messageModel
      .find({
        'ContactInformation.Date_Time_delivery': {
          $gte: start.toISOString(),
          $lte: end.toISOString(),
        },
      })
      .exec();
  }


Этот эндпоинт возвращает данные за период времени







async getTransportRequestsByDateRange(startDate: string, endDate: string): Promise<any[]> {
  // Преобразование дат из строки в объект Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Установка времени на начало и конец дня для учета всего диапазона дат
  start.setUTCHours(0, 0, 0, 0); // начало дня для startDate
  end.setUTCHours(23, 59, 59, 999); // конец дня для endDate

  // Преобразование объектов Date обратно в строки для поиска в базе данных
  const formattedStartDate = start.toISOString().split('T')[0];
  const formattedEndDate = end.toISOString().split('T')[0];

  // Логирование для отладки
  console.log('Ищем заявки с:', formattedStartDate, 'по', formattedEndDate);

  // Поиск заявок в базе данных в указанном диапазоне дат
  return await this.messageModel.find({
    'ContactInformation.Date_Time_delivery': {
      $gte: formattedStartDate,
      $lte: formattedEndDate,
    },
  }).exec();
}

