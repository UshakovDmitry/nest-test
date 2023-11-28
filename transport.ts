search(value: string) {
  console.log(this.model.transportRequests, 'заявки');

  const searchQuery = value.toLowerCase();

  if (this.model.currentCity !== 'Все города' && this.model.currentCity !== '') {
    this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(searchQuery) ||
             item.document.numberPPO.toLowerCase().includes(searchQuery);
    });
  } else {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(searchQuery) ||
             item.document.numberPPO.toLowerCase().includes(searchQuery);
    });
  }
}

