я реализовал post запрос где фронетнд мне присылает дату а я возвращаю всех водителй только с теми заказами которые совпадают с этой датой 
но почему то он возвращает всех  
@Post('/by-date')
  async getDriversByDate(@Body('date') date: string) {
    console.log('date', date);

    return await this.driversService.getDriversByDate(date);
  }


  async getDriversByDate(date: string) {
    return await this.dbService.getDriversByDate(date);
  }



  async getDriversByDate(date: string) {
    const drivers = this.getAllDrivers();

    (await drivers).forEach((driver) => {
      driver.transportRequests.forEach((transportRequest) => {
        console.log(
          transportRequest.contactInformation.Date_Time_delivery.split(' ')[0],
          'Date_Time_delivery',
        );

        if (
          transportRequest.contactInformation.Date_Time_delivery.split(
            '',
          )[0] === date
        ) {
          return transportRequest;
        }
      });
    });
    return drivers;
  }
