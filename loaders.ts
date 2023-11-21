import { useGetApi } from '../../domain/services/getHTTP.service';
import { type TransportComponentModel } from './transport.model';

export class TransportComponentViewModel {
  model: TransportComponentModel;

  constructor(model: TransportComponentModel) {
    this.model = model;
    this.getData();
  }



  async getData() {
    const response = await useGetApi('getTransport');
    const data = await response;
    this.model.transport = data;
    this.model.filteredTransport = this.model.transport;
    this.model.cities = this.model.transport.map((item) => item.city);
  }

  selectCity(city: string): void {
    this.filterTableByCity(city);
  }

  filterTableByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredTransport = this.model.transport;
      return;
    }
    this.model.filteredTransport = this.model.transport.filter(
      (item) => item.city === city,
    );
  }

  setLoaders(): void {
    this.model.isTransport = false;
    this.model.isLoaders = true;
  }

  setTransport(): void {
    this.model.isLoaders = false;
    this.model.isTransport = true;
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }
}




Я хочу изменить логику присваения городов в this.model.cities = this.model.transport.map((item) => item.city);
Они сейчас повторяются 
Используй new Set
