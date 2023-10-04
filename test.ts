setSearchTerm(term: string) {
  this.searchTerm = term;
  this.filterRequests();
}







filterRequests() {
  if (this.searchTerm) {
    this.filteredRequests = this.model.transportRequests.filter(request => 
      request.request.number.includes(this.searchTerm)
    );
  } else {
    this.filteredRequests = [...this.model.transportRequests];
  }
}






export class TransportRequestsViewModel {
  ...
  searchTerm: string = ''; 
  filteredRequests: any[] = [];

  ...
}









<!-- Это ваш новый инпут для поиска -->
<div class="search-input">
  <input v-model="searchTerm" @input="filterRequests" placeholder="Введите номер для поиска..." />
</div>
