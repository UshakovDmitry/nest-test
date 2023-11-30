// В модели данных
lastFilteredCity: string = 'Все города';



filterTableByCity(city: string): void {
  this.model.lastFilteredCity = city; // Обновление последнего фильтра города
  this.model.currentCity = city;

  if (city === 'Все города') {
    this.model.filteredCouriers = this.model.couriers;
    return;
  }

  this.model.filteredCouriers = this.model.couriers.filter(
    (item) => item.city === city,
  );
}


search(value: string): void {
  let baseList = this.model.couriers;

  // Фильтрация базового списка по последнему выбранному городу
  if (this.model.lastFilteredCity !== 'Все города') {
    baseList = baseList.filter((item) => item.city === this.model.lastFilteredCity);
  }

  // Поиск по отфильтрованному списку
  this.model.filteredCouriers = baseList.filter((item) => {
    return item.courierFullName.toLowerCase().includes(value.toLowerCase());
  });
}
