filterRequestsByContractor(contractor: string): void {
  this.model.currentContractor = contractor;

  // Фильтрация списка по контрагенту
  let filteredByContractor = [];
  if (contractor === "Прочее") {
    filteredByContractor = this.model.transportRequests.filter(
      request => !request.filterContractor || request.filterContractor.trim() === ""
    );
  } else {
    filteredByContractor = this.model.transportRequests.filter(
      request => request.filterContractor === contractor || !contractor
    );
  }

  // Дополнительная фильтрация по городу, если выбран конкретный город
  if (this.model.currentCity && this.model.currentCity !== 'Все города') {
    this.model.filteredTransportRequests = filteredByContractor.filter(request => {
      const addressParts = request.deliveryAddress.address.split(',');
      const requestCity = addressParts[0]?.trim();
      return requestCity === this.model.currentCity;
    });
  } else {
    this.model.filteredTransportRequests = filteredByContractor;
  }

  // Обновляем список после фильтрации
  this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
}
