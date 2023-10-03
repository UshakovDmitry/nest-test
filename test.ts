get filteredTransportRequests() {
  if (!this.model.searchTerm) {
    return this.model.transportRequests;
  }
  
  return this.model.transportRequests.filter(request => 
    request.number.includes(this.model.searchTerm)
  );
}



<div class="transport__search">
  <input 
    v-model="model.searchTerm" 
    placeholder="Поиск по номеру..."
  />
</div>
