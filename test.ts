// В вашем TransportRequestsViewModel

filterRequestsByContractor(contractor: string): void {
    if (contractor === "Прочее") {
        this.model.filteredTransportRequests = this.model.transportRequests.filter(
            request => !request.FilterContractor || request.FilterContractor.trim() === ""
        );
    } else {
        this.model.filteredTransportRequests = this.model.transportRequests.filter(
            request => request.FilterContractor === contractor
        );
    }
}
