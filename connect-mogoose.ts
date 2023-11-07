  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const newHistoryEntry = new this.historyModel({
      name,
      time,
      comment,
    });

    try {
      const savedEntry = await newHistoryEntry.save();
      return savedEntry;
    } catch (error) {
      throw new HttpException('Не удалось сохранить запись в историю действий', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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

    console.log(requestData, 'корректировка ( отправляю Сане )');

    // http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver  боевая
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          // 'http://10.0.1.32:8080/1CHS/hs/TMS//ReplaceDriver', // тестовая
          'http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver ',
          requestData,
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Ошибка при отправке запроса на корректировку транспортной заявки: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

Внутри transportRequestCorrection нужно вызвать recordHistoryAction и передать туда  { name: dto.userName , time: dto.timeDelivery , comment: dto.comment }
