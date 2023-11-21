// ... ваш предыдущий код ...

response.forEach((data: any) => {
  // ... ваш код обработки данных ...
  
  // Добавляем "Все города" в список городов, если его ещё нет
  if (!this.model.cities.includes("Все города")) {
    this.model.cities.unshift("Все города");
  }
});

// ... ваш код продолжается ...



filterRequestsByCity(city: string): void {
  console.log(city, 'city');

  if (city === 'Все города') {
    // Если выбраны "Все города", то показываем все заявки
    this.model.filteredTransportRequests = this.model.transportRequests;
  } else {
    // Фильтрация заявок по выбранному городу
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
      request => {
        const addressParts = request.deliveryAddress.address.split(',');
        const requestCity = addressParts[0]?.trim(); 
        return requestCity === city;
      }
    );
  }
}
