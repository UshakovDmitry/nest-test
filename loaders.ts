import { BadRequestException } from '@nestjs/common';

@Post('/correction')
async setDutyDrivers(@Body() dto: CorrectionDto) {
    // Проверка наличия и содержимого поля 'cap'
    if (!dto.cap) {
        throw new BadRequestException('Поле cap отсутствует');
    }
    if (!dto.cap.DateDoc || dto.cap.DateDoc.trim() === '') {
        throw new BadRequestException('Поле DateDoc в cap отсутствует или пусто');
    }

    // Проверка наличия и содержимого массива 'items'
    if (!dto.items || !Array.isArray(dto.items) || dto.items.length === 0) {
        throw new BadRequestException('Поле items отсутствует или пусто');
    }
    dto.items.forEach((item, index) => {
        if (!item.Driver || item.Driver.trim() === '') {
            throw new BadRequestException(`Поле Driver отсутствует или пусто в элементе items[${index}]`);
        }
        if (item.Duty === undefined) {
            throw new BadRequestException(`Поле Duty отсутствует в элементе items[${index}]`);
        }
        if (!item.Date || item.Date.trim() === '') {
            throw new BadRequestException(`Поле Date отсутствует или пусто в элементе items[${index}]`);
        }
        if (item.Values === undefined) {
            throw new BadRequestException(`Поле Values отсутствует в элементе items[${index}]`);
        }
    });

    // Проверка наличия и содержимого поля 'history'
    if (!dto.history) {
        throw new BadRequestException('Поле history отсутствует');
    }
    if (!dto.history.UserIIN || dto.history.UserIIN.trim() === '') {
        throw new BadRequestException('Поле UserIIN в history отсутствует или пусто');
    }
    if (!dto.history.UserName || dto.history.UserName.trim() === '') {
        throw new BadRequestException('Поле UserName в history отсутствует или пусто');
    }
    if (!dto.history.date || dto.history.date.trim() === '') {
        throw new BadRequestException('Поле date в history отсутствует или пусто');
    }

    this.dutydriversService.addHistory(dto.history);
    return this.dutydriversService.setDutyDrivers(dto.cap, dto.items);
}
