
   @Get('/names')
    getCouriersNames(@Body('city') city: string) {
      return this.couriersService.getCouriersNames(city);
    }
