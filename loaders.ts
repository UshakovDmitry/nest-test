@Injectable()
export class DBService {
  // ... (остальной код без изменений)

  async getDriverByDriverName(driverName: string): Promise<any> {
    return await this.messageModel.findOne({ Driver: driverName }).sort({ DateCreated: -1 }).exec();
  }
}
