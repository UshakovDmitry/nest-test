export class TransportRequestsViewModel {
  model: TransportRequestsModel;
  eventSource: EventSource; // Объявите здесь
  // ...
}




constructor(model: any) {
  this.model = model;
  this.eventSource = new EventSource('http://localhost:4000/api/getTransportRequests/sse');
  this.setupEventListeners();
  this.getTransportRequests();
}



private setupEventListeners() {
  this.eventSource.onmessage = (event) => {
    console.log('New message', JSON.parse(event.data));
    
    if (JSON.parse(event.data).message === 'Pong') {
      this.getTransportRequests();
    }
  };
}
