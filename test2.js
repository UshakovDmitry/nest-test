class CapDto {
  DateDoc: string;
}

class ItemDto {
  Driver: string;
  Duty: string;
  Date: string;
  Values: string;
}

class HistoryDto {
  UserIIN: string;
  UserName: string;
  date: string;
}

export class CorrectionDto {
  Сap: CapDto;
  items: ItemDto[];
  history: HistoryDto;
}

