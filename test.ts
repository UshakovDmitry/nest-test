filterRequestsByCity(city: string): void {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => {
            const addressParts = request.deliveryAddress.address.split(',');
            const requestCity = addressParts[0]?.trim(); // Предполагаем, что город - это первая часть адреса
            return requestCity === city;
        }
    );
}
