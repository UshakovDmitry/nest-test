@Injectable()
export class CouriersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  async getCouriersByDate(date: string) {
    const driversByDate =  this.dbService.getDriversByDate(date);
    const allCouriers = await this.getCouriers();
    
    // Фильтруем allCouriers, оставляя только тех водителей, которые присутствуют в driversByDate.
    const filteredCouriers = allCouriers.filter(courier => 
      driversByDate.some(driver => driver.driver === courier.Drivers)
    );
    
    return filteredCouriers; // Возвращаем отфильтрованный список курьеров.
  }

  // ... (остальные методы)
}

