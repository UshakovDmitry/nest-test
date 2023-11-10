async transportRequestCorrection(dto): Promise<any> {
  // Сопоставление полей DTO с ожидаемыми полями в запросе
  const requestData = {
    DocNumber: dto.documentNumber,
    DateDoc: dto.date,
    TimeDelivery: dto.timeDelivery,
    Driver: dto.driver,
    СarNumber: dto.carNumber,
    UserIIN: dto.userIIN,
    Сomment: dto.comment,
  };

  // Проверка наличия и формата всех необходимых полей
  const requiredFields = [
    'DocNumber',
    'DateDoc',
    'TimeDelivery',
    'Driver',
    'UserIIN',
    'Сomment',
  ];

  for (const field of requiredFields) {
    if (!requestData[field]) {
      throw new HttpException(
        `Обязательное поле отсутствует: ${field}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof requestData[field] !== 'string') {
      throw new HttpException(
        `Неверный тип данных для поля: ${field}. Ожидалась строка.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // URL боевого сервера
  const liveServerUrl = 'http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver';

  try {
    // Отправка запроса на корректировку
    const response = await firstValueFrom(
      this.httpService.post(liveServerUrl, requestData),
    );

    // Проверка URL запроса и запись в БД в случае успеха
    if (response.data && axios.getUri(response.config) === liveServerUrl) {
      this.actionHistoryService.addCorrectionHistory({
        name: dto.userName, 
        time: dto.timeDelivery, 
        comment: dto.comment
      });
    }

    return response.data;
  } catch (error) {
    throw new HttpException(
      `Ошибка при отправке запроса на корректировку транспортной заявки: ${error}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

