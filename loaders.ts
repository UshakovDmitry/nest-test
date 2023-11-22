  @Post('/stats')
  async getDriversStats(@Body() dto: GetDriversStatsDto) {
      if (!dto.date) {
          throw new BadRequestException('Поле date отсутствует');
      }
      if (!dto.city) {
          throw new BadRequestException('Поле city отсутствует');
      }
      return this.driversService.getDriversStatsByDate(dto.date, dto.city);
  }



Нужно проверять что с фронтенда приходят все эти поля
Если нее приходят то необходимо возвращать ошибку с текстом о том какого поля нет
