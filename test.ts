    for (const driver of collectionDriverNames) {
      const driverTransportRequest = {
        number: '',
        date: '',
        dateCreated: '',
        organization: '',
        documentStatus: '',
        ISR: '',
        nuberPPO: '',
        informalDocument: '',
        filterContractor: '',
        loanAgreementStatus: '',
        typePayment: '',
        // quantities: {
        //   totalWeight: '',
        //   totalAmount: '',
        // },
        chronologies: [],
        contactInformation: {},
        orders: [],
      };

      const driverOne = {
        driver: '',
        сarNumber: '',
        carModel: '',
        transportRequests: [driverTransportRequest],
      };

      driverOne.driver = driver;

      const collection = await this.messageModel
        .find({ Driver: driver })
        .exec();
      for (const item of collection) {
        driverOne.сarNumber = item.NumberCar;
        driverOne.carModel = item.CarModel;
        driverTransportRequest.number = item.Number;
        driverTransportRequest.date = item.Date;
        driverTransportRequest.dateCreated = item.DateCreated;
        driverTransportRequest.organization = item.Organization;
        driverTransportRequest.documentStatus = item.DocumentStatus;
        driverTransportRequest.ISR = item.ISR;
        driverTransportRequest.nuberPPO = item.NumberPPO;
        driverTransportRequest.informalDocument = item.Informal_Document;
        driverTransportRequest.filterContractor = item.FilterContractor;
        driverTransportRequest.loanAgreementStatus = item.loanAgreementStatus;
        driverTransportRequest.typePayment = item.TypePayment;
        // driverTransportRequest.quantities.totalWeight = item.StructureQuantities.TotalWeight;
        // driverTransportRequest.quantities.totalAmount = item.StructureQuantities.TotalAmount;
        driverTransportRequest.chronologies = item.ArrayChronologies;
        driverTransportRequest.contactInformation = item.ContactInformation;
      }
      console.log('collection', collection);

      const prepareOrders = collection.map((item) => item.ArrayStrings);

      const flatOrders = prepareOrders.flat();

      const hashSummSet = new Set();
      flatOrders.forEach((order) => {
        const hs = hashSumm(JSON.stringify(order));
        if (!hashSummSet.has(hs)) {
          hashSummSet.add(hs);
          driverTransportRequest.orders.push(order);
        }
      });

      drivers.push(driverOne);
    }
