sort(index: number): void {
  switch (this.sortState) {
    case 'none':
    case 'descending':
      this.sortState = 'ascending';
      this.model.filteredCouriers.sort((a, b) => a.courierFullName.localeCompare(b.courierFullName));
      break;
    case 'ascending':
      this.sortState = 'descending';
      // Возвращаем исходное состояние:
      this.model.filteredCouriers = [...this.model.couriers];
      break;
  }
}


async getCouriers(): Promise<void> {
  ...
  this.model.couriers = couriers;
  this.model.filteredCouriers = [...this.model.couriers];
  this.sortState = 'none';
  ...
}




export class CouriersViewModel {
  model: CouriersModel;
  
  // Добавьте эту строку:
  sortState: 'none' | 'ascending' | 'descending' = 'none';

  constructor(model: CouriersModel) {
    ...
  }
  
  ...
}










