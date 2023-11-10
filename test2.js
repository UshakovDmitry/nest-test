dto

import { IsNotEmpty, IsString } from 'class-validator';

class CapDto {
    @IsNotEmpty()
    @IsString()
    DateDoc: string;
  }
  
  class ItemDto {
    @IsNotEmpty()
    @IsString()
    Driver: string;

    @IsNotEmpty()
    @IsString()
    Duty: string;

    @IsNotEmpty()
    @IsString()
    Date: string;

    @IsNotEmpty()
    @IsString()
    Values: string;
  }
  
  class HistoryDto {
    @IsNotEmpty()
    @IsString()
    UserIIN: string;

    @IsNotEmpty()
    @IsString()
    UserName: string;
    
    @IsNotEmpty()
    @IsString()
    date: string;
  }
  
  export class CorrectionDto {
    Сap: CapDto;
    items: ItemDto[];
    history: HistoryDto;
  } 

Теперь нужно эти данные отправить на другой url внктри this.dutydriversService.setDutyDrivers
передай туда все кроме HistoryDto

и напиши сам метод 

 @Post('/correction') 
  async setDutyDrivers(@Body() dto: CorrectionDto) {
    return this.dutydriversService.setDutyDrivers(
      {
        
      }
    );
}



