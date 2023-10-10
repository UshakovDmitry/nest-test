sort(index: number): void {
  const propertyToSortBy = this.getPropertyByIndex(index);

  switch (this.sortState) {
    case 'none':
    case 'descending':
      this.sortState = 'ascending';
      this.model.filteredCouriers.sort((a, b) => 
        a[propertyToSortBy].length - b[propertyToSortBy].length
      );
      break;
    case 'ascending':
      this.sortState = 'descending';
      this.model.filteredCouriers.sort((a, b) => 
        b[propertyToSortBy].length - a[propertyToSortBy].length
      );
      break;
  }
}

getPropertyByIndex(index: number): keyof ICourier {
  switch(index) {
    case 0: return 'courierFullName';
    case 1: return 'carNumber';
    case 2: return 'hiringType';
    case 3: return 'schedule';
    case 4: return 'hardWindow';
    case 5: return 'returnToWarehouse';
    case 6: return 'city';
    case 7: return 'goToDetail';
    default: throw new Error(`Unknown index: ${index}`);
  }
}








