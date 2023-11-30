ничего не меняется
консоль отработывает 
где ошибка?

export class TransportRequestsModel implements TransportRequestsModel {
  // dateSelection: string;
  transportRequests: any[];
  headersTransportRequests: string[];
  configTransportRequests: any;
  cities: string[];
  currentCity: string;
  filterContractors: object;
  currentContractor: string;
  filteredTransportRequests: any[];
  isToday: boolean;
  isYesterday: boolean;
  isTomorrow: boolean;
  fields?: any[];
  lastFilteredTransportRequests: any[];
  sortState: 'none' | 'ascending' | 'descending' = 'none';

  timeRange: object;
  // dateSelection: any;

  constructor(obj) {
    this.isToday = true;
    this.isYesterday = false;
    this.isTomorrow = false;
    this.sortState = 'none';


  sortRequests(index) {
    const propertyToSortBy = this.getPropertyByIndex(index);
    console.log(propertyToSortBy, 'propertyToSortBy');
     
  
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
  
  getPropertyByIndex(index) {
    switch (index) {
      case 0:
        return 'request.status';
      default:
        throw new Error(`Не смог определить индекс! Индекс: ${index}`);
    }
  }
}



   <table-component
          :headers="model.headersTransportRequests"
          :rows="model.filteredTransportRequests"
          :config="model.configTransportRequests"
          :currentCity="model.currentCity"
          :currentContractor="model.currentContractor"
          :pagination="true"
          :hover="true"
          @sort="viewModel.sortRequests($event)"
          @goToDetailRequest="viewModel.goToTransportRequestDetail($event)"
        ></table-component>
