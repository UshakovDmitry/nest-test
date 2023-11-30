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

  // Установка времени на начало дня (00:00:00 UTC)
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999); // Установка времени на конец дня (23:59:59 UTC)

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



проблема в том что если я пришлю startDate: 2023-11-22
endDate: 2023-11-24 то он не учитывает 22 число
я хочу чтобы он включал эту дату (startDate) в логику поиска данных
