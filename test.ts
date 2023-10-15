filterRequestsByCity(city: string): void {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => request.city === city
    );
}
