async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.messageModel.findOne({ Number: number }).exec();
}




async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.dbService.getTransportRequestByNumber(number);
}




import { Controller, Get, Post, Body, Param } from '@nestjs/common';

...

@Post('getByNumber')
async getTransportRequestByNumber(@Body('number') number: string) {
    return this.transportRequestsService.getTransportRequestByNumber(number);
}







{
    "number": "12345"
}
