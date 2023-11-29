  async getAllDrivers() {
    const aggregation = [
      {
        $sort: { Driver: 1 },
      },
      {
        $group: {
          _id: '$Driver',
          сarNumber: { $first: '$NumberCar' },
          carModel: { $first: '$CarModel' },
          // TODO: Когда дропну базу, нужно будет поменять на $first для driverIIN и phoneDriver
          driverIIN: { $max: '$DriverIIN' },
          phoneDriver: { $max: '$PhoneDriver' },
          transportRequests: {
            $push: {
              number: '$Number',
              IdYandex: '$IdYandex',
              IsDelete: '$IsDelete',
              distribution: '$distribution',
              date: '$Date',
              dateCreated: '$DateCreated',
              organization: '$Organization',
              documentStatus: '$DocumentStatus',
              completedDelivery: '$CompletedDelivery',
              ISR: '$ISR',
              numberPPO: '$NumberPPO',
              informalDocument: '$Informal_Document',
              filterContractor: '$FilterContractor',
              loanAgreementStatus: '$loanAgreementStatus',
              typePayment: '$TypePayment',
              chronologies: '$ArrayChronologies',
              contactInformation: '$ContactInformation',
              orders: '$ArrayStrings',
            },
          },
        },
      },
    ];

    const driversAggregated = await this.messageModel
      .aggregate(aggregation as any)
      .exec();

    const drivers = driversAggregated.map((driverData) => ({
      driver: driverData._id,
      carNumber: driverData.сarNumber,
      carModel: driverData.carModel,
      driverIIN: driverData.driverIIN,
      phoneDriver: driverData.phoneDriver,
      transportRequests: driverData.transportRequests.map((request) => ({
        ...request,
        orders: request.orders.flat(),
      })),
    }));
    const updatedDrivers = this.setCountOrdersStatus(drivers);

    const testDrivers = await this.updateDeliveryStatus(updatedDrivers);
    return testDrivers;
  }
