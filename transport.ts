filterRequestsByCity(city: string): void {
  this.model.currentCity = city;
  if (city === 'Все города') {
    this.model.filteredTransportRequests = this.model.transportRequests;
  } else {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
      request => {
        const addressParts = request.deliveryAddress.address.split(',');
        const requestCity = addressParts[0]?.trim(); 
        return requestCity === city;
      }
    );
  }

  // Сохраняем состояние последнего примененного фильтра
  this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  
  // Обновляем данные о подрядчиках
  this.updateContractorsData();
}

updateContractorsData(): void {
  // Сбрасываем текущие данные о подрядчиках
  this.model.filterContractors = {};

  // Пересчитываем данные на основе отфильтрованного списка заявок
  this.model.filteredTransportRequests.forEach(request => {
    const contractor = request.filterContractor ? request.filterContractor : 'Прочее';
    if (this.model.filterContractors[contractor]) {
      this.model.filterContractors[contractor] += 1;
    } else {
      this.model.filterContractors[contractor] = 1;
    }
  });
}
