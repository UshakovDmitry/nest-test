drivers.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';

// ... остальной код ...

@Controller('/api/drivers')
export class DriversController {
    // ... остальной код ...

    @Post('/by-date')
    async getDriversByDate(@Body('DateCreated') date: string) {
        return await this.driversService.getDriversByDate(date);
    }
}








// ... остальной код ...

@Injectable()
export class DBService {
    // ... остальной код ...

    async getDriversByDate(date: string): Promise<any[]> {
        return await this.messageModel.find({ DateCreated: date }).exec();
    }
}










// ... остальной код ...

@Injectable()
export class DriversService {
    // ... остальной код ...

    async getDriversByDate(date: string) {
        return await this.dbService.getDriversByDate(date); 
    }
}







{
    "DateCreated": "28-10-2023"
}



