for (const driver of collectionDriverNames) {
    const driverOne = {
        driver: driver, // можно сразу присвоить значение
        сarNumber: '',
        carModel: '',
        transportRequests: [],
    };

    const collection = await this.messageModel
        .find({ Driver: driver })
        .exec();

    for (const item of collection) {
        const driverTransportRequest = {
            number: item.Number,
            date: item.Date,
            dateCreated: item.DateCreated,
            organization: item.Organization,
            documentStatus: item.DocumentStatus,
            ISR: item.ISR,
            nuberPPO: item.NumberPPO,
            informalDocument: item.Informal_Document,
            filterContractor: item.FilterContractor,
            loanAgreementStatus: item.loanAgreementStatus,
            typePayment: item.TypePayment,
            chronologies: item.ArrayChronologies,
            contactInformation: item.ContactInformation,
            orders: []
        };

        driverOne.сarNumber = item.NumberCar;
        driverOne.carModel = item.CarModel;

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

        driverOne.transportRequests.push(driverTransportRequest);
    }

    drivers.push(driverOne);
}

return drivers;
