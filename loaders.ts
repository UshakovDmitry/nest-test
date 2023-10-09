@Injectable()
export class DBService {
  // ... (остальной код без изменений)

  async getDriverByDriverName(driverName: string): Promise<any> {
    return await this.messageModel.findOne({ Driver: driverName }).exec();
  }
}





@Injectable()
export class CouriersService {
  constructor(private readonly httpService: HttpService ,  private readonly dbService: DBService) {}

  async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));

    const data = await Promise.all(response.data.data.map(async (item: any) => {
        // ... (оставьте код без изменений)

        let carNumberFromDB = '';

        const driverFromDB = await this.dbService.getDriverByDriverName(item.Drivers);
        if (driverFromDB) {
            carNumberFromDB = driverFromDB.NumberCar;
        }

        // ... (оставьте код без изменений)
    }));

    return data;
  }
}





