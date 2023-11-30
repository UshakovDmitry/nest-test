sortRequests(index) {
  const propertyToSortBy = this.getPropertyByIndex(index);

  if (this.model.sortState === 'none' || this.model.sortState === 'descending') {
    this.model.sortState = 'ascending';
    // Логика сортировки по возрастанию
  } else if (this.model.sortState === 'ascending') {
    this.model.sortState = 'descending';
    // Логика сортировки по убыванию
  }
  
  // Осуществление сортировки в зависимости от состояния
  this.model.filteredTransportRequests.sort((a, b) => {
    if (propertyToSortBy === 'request.status') {
      if (this.model.sortState === 'ascending') {
        return (a.request.status === b.request.status) ? 0 : a.request.status ? 1 : -1;
      } else {
        return (a.request.status === b.request.status) ? 0 : a.request.status ? -1 : 1;
      }
    } else {
      if (this.model.sortState === 'ascending') {
        return (a[propertyToSortBy] < b[propertyToSortBy]) ? -1 : (a[propertyToSortBy] > b[propertyToSortBy]) ? 1 : 0;
      } else {
        return (a[propertyToSortBy] > b[propertyToSortBy]) ? -1 : (a[propertyToSortBy] < b[propertyToSortBy]) ? 1 : 0;
      }
    }
  });
}
