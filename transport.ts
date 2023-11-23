filterRequestsByContractor(contractor: string): void {
  let baseRequestsList = this.model.transportRequests;

  // Если уже применен фильтр по городу, используем отфильтрованный список
  if (this.model.currentCity !== 'Все города' && this.model.currentCity) {
    baseRequestsList = this.model.filteredTransportRequests;
  }

  if (!contractor) { // Если contractor пустая строка, снимаем фильтр
    this.model.filteredTransportRequests = baseRequestsList;
  } else if (contractor === "Прочее") {
    this.model.filteredTransportRequests = baseRequestsList.filter(
      request => !request.filterContractor || request.filterContractor.trim() === ""
    );
  } else {
    this.model.filteredTransportRequests = baseRequestsList.filter(
      request => request.filterContractor === contractor
    );
  }

  // Обновляем список после фильтрации
  this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
}
