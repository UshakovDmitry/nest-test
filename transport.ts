  async getDriversByDate(date: string) {
    console.log('date', date);
    
    const allDrivers = await this.getAllDrivers()
    const drivers = await this.updateDriversWithExternalData(allDrivers)

    const filteredDrivers = drivers
      .map((driver) => {
        const filteredRequests = driver.transportRequests.filter(
          (transportRequest) => {
            return (
              transportRequest.contactInformation.Date_Time_delivery.split(
                ' ',
              )[0] === date
            );
          },
        );

        return { ...driver, transportRequests: filteredRequests };
      })
      .filter((driver) => driver.transportRequests.length > 0);

    const updatedDrivers = this.setCountOrdersStatus(filteredDrivers, date);
    return updatedDrivers;
  }

мне нужно кое-что поменять 
мне приходит дата в функцию 
я хочу выполнять  const drivers = await this.updateDriversWithExternalData(allDrivers)
только тогда когда дата равна сегодняшнему дню
во всех остальных случаях я не хочу выполнять updateDriversWithExternalData 

вот в таком виде приходит дата год-месяц-число
date 2023-11-30

