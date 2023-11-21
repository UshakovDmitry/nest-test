async getData() {
  const response = await useGetApi('getTransport');
  const data = await response;
  this.model.transport = data;
  this.model.filteredTransport = this.model.transport;

  // Create a Set from the city names to remove duplicates, then convert it back to an array
  this.model.cities = Array.from(new Set(this.model.transport.map(item => item.city)));
}

