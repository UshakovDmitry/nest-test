@Post('/names')  // Обновлено с @Get на @Post, так как теперь используется тело запроса
async getCouriersNames(@Body() body: { city: string, date: string }) {
    const { city, date } = body;
    return this.couriersService.getCouriersNames(city, date); // Передаем city и date в сервис
}
