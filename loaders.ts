@Injectable()
export class CouriersService {
  constructor(private readonly httpService: HttpService ,  private readonly dbService: DBService) {}

  async getCouriers() {
    // ... (оставьте код без изменений)

    const data = await Promise.all(response.data.data.map(async (item: any) => {
      // ... (оставьте код без изменений)

      let carNumberFromDB = '';

      const driverFromDB = await this.getDriverFromDatabase(item.Drivers);
      if (driverFromDB) {
          carNumberFromDB = driverFromDB.NumberCar;
      }

      // ... (оставьте код без изменений)
    }));

    return data;
  }

  private async getDriverFromDatabase(driverName: string) {
      return await this.dbService.collection('drivers').findOne({ Driver: driverName });
  }
}

@ApiTags('Couriers')
@Controller('/api/getCouriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Get()
  getCouriers() {
    return this.couriersService.getCouriers();
  }
}





