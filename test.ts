у меня есть массив   drivers 
у каджого его элемента есть поле driver
я хочу сравнивать приходящее значение и возвращать элемент у которого имя совпадает с name

async getDriversByName(name: string) {
    const drivers = await this.getAllDrivers();
    const filteredDrivers = drivers
      .map((driver) => {
        
      })
    return filteredDrivers;
  }
}
