  search(value: string) {
    console.log(this.model.transportRequests, 'заявки');
    
    if (this.model.currentCity !== 'Все города' && this.model.currentCity !== '') {
    this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  } else {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  }
}

Добавь также поиск помимо item.request.number еще и item.document.numberPPO
