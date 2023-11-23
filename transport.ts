export class TransportRequestsViewModel {
  // ... ваш текущий код ...

  filterRequestsByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredTransportRequests = this.model.transportRequests;
    } else {
      this.model.filteredTransportRequests = this.model.transportRequests.filter(request => {
        const addressParts = request.deliveryAddress.address.split(',');
        const requestCity = addressParts[0]?.trim(); 
        return requestCity === city;
      });
    }
    // Сохраняем состояние последнего примененного фильтра
    this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  }

  search(value: string) {
    // Используем lastFilteredTransportRequests для поиска
    this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  }

  // ... остальной код ...
}
export class TransportRequestsViewModel {
  // ... ваш текущий код ...

  filterRequestsByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredTransportRequests = this.model.transportRequests;
    } else {
      this.model.filteredTransportRequests = this.model.transportRequests.filter(request => {
        const addressParts = request.deliveryAddress.address.split(',');
        const requestCity = addressParts[0]?.trim(); 
        return requestCity === city;
      });
    }
    // Сохраняем состояние последнего примененного фильтра
    this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  }

  search(value: string) {
    // Используем lastFilteredTransportRequests для поиска
    this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  }

  // ... остальной код ...
}
