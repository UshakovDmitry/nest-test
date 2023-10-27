https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/

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

    
    console.log(requestData, 'корректировка ( отправляю Сане )');

    // http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver  боевая
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://10.0.1.32:8080/1CHS/hs/TMS//ReplaceDriver',
          requestData,
        ),
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
