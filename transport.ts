async updateDriversWithExternalData(drivers) {
  try {
    const response = await axios.get('http://10.0.1.20/1CHS/hs/Yandex_Go/ListDiliveryBlocked');
    const externalData = response.data.data;

    drivers.forEach(driver => {
      const matchedDriver = externalData.find(externalDriver => 
        externalDriver.DriverName.trim() === driver.driver.trim()
      );

      if (matchedDriver && matchedDriver.CarModel && matchedDriver.RegistrationNumber) {
        driver.carModel = matchedDriver.CarModel;
        driver.carNumber = matchedDriver.RegistrationNumber;
      } 
      // Если водителя нет в externalData, оставляем его данные без изменений
      else {
        driver.carModel = driver.carModel || '';
        driver.carNumber = driver.carNumber || '';
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных из внешнего источника:', error);
  }

  return drivers;
}
