у меня есть база данных вот с такими сущностями 

_id
651cfb8b3e71be8042bad3ef
Number
"№№00148927"
Date
"04.10.2023 11:42:53"
DateCreated
"4-10-2023"
Organization
"TOO Gulser Computers (Гулсер Компьютерс)"
DocumentStatus
"Доставляется"
CarModel
""
NumberCar
""
Driver
"Бегимбетов Жаслан Бесембаевич"
ISR
"(771)4022337"
TypePayment
"Наличные"
loanAgreementStatus
""
IdYandex
""
distribution
false
Informal_Document
"Заказ покупателя ППО"
FilterContractor
"Alser"

ArrayStrings
Array (1)

0
Object

ContactInformation
Object
City
"Алматы"
Delivery_Condition
"Доставка"
Date_Time_delivery
"2023-10-04 До 20:00"
Time_Window
"нет данных"
Latitude
"43.242627"
Longitude
"76.876016"
Street
"78"
Home
"140"
Phone
"(771)4022337"
Apartment
"78"
Contractor
"ДАНИЯР"
_id
651cff241d80def42ca02fe5

StructureQuantities
Object
TotalWeight
"3.3"
TotalAmount
"10"
_id
651cff241d80def42ca02fe6

ArrayChronologies
Array (1)

0
Object

я хочу делать проверку по полю Driver
если в моих приходящих данных с http в поле Drivers совпадает то нужно брать из бд поле NumberCar и присваивать в carNumber
вот здесь 
  async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));

    const data = response.data.data.map((item: any) => {
        const convertValue = (value: string, fieldName: string) => {
            if (value === 'Да') return true;
            if (value === 'Нет') return false;
            //TODO: тут надо будет покумекать что возвращать если не Да и не Нет
            return value;
            // throw new Error(`Unexpected value for ${fieldName}: ${value}`);
        };

        return {
            ...item,
            carNumber: '', // вот сюда нужно записывать номер машины или пустую строку
            HardTimeWindow: convertValue(item.HardTimeWindow, 'HardTimeWindow'),
            ReturnWarehouse: convertValue(item.ReturnWarehouse, 'ReturnWarehouse')
        };
    });

    return data;
}
