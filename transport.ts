console.log('Before sorting', this.model.filteredTransportRequests.map(item => item.request.status));
this.model.filteredTransportRequests.sort((a, b) => {
  return a[propertyToSortBy] === b[propertyToSortBy] ? 0 : a[propertyToSortBy] ? -1 : 1;
});
console.log('After sorting', this.model.filteredTransportRequests.map(item => item.request.status));
