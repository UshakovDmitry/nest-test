  @Post('/correction')
  async setDutyDrivers(@Body() dto: CorrectionDto) {
    this.dutydriversService.addHistory(dto.history);
    return this.dutydriversService.setDutyDrivers(dto.cap, dto.items);
  }


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
    Duty: boolean;

    @IsNotEmpty()
    @IsString()
    Date: string;

    @IsNotEmpty()
    @IsString()
    Values: boolean;
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
    cap: CapDto;
    items: ItemDto[];
    history: HistoryDto;
  }


Нужно проверять что с фронтенда приходят все эти поля
Если нее приходят то необходимо возвращать ошибку с текстом о том какого поля нет
