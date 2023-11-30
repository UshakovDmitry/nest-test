sortRequests(index: string) {
  const propertyToSortBy = this.getPropertyByIndex(index); 

  switch (this.model.sortState) {
    case 'none':
    case 'descending':
      this.model.sortState = 'ascending';
      this.model.filteredTransportRequests.sort((a, b) => {
        return a[propertyToSortBy] === b[propertyToSortBy] ? 0 : a[propertyToSortBy] ? -1 : 1;
      });
      break;
    case 'ascending':
      this.model.sortState = 'descending';
      this.model.filteredTransportRequests.sort((a, b) => {
        return a[propertyToSortBy] === b[propertyToSortBy] ? 0 : a[propertyToSortBy] ? 1 : -1;
      });
      break;
  }
}

getPropertyByIndex(index: number) {
  switch (index) {
    case 0:
      return 'request.status';
    default:
      throw new Error(`Не смог определить индекс! Индекс: ${index}`);
  }
}
