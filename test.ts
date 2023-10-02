async getAllDrivers() {
    const aggregation = [
        {
            $sort: { Driver: 1 }
        },
        {
            $group: {
                _id: "$Driver",
                transportRequests: {
                    $push: {
                        number: "$Number",
                        date: "$Date",
                        dateCreated: "$DateCreated",
                        organization: "$Organization",
                        documentStatus: "$DocumentStatus",
                        ISR: "$ISR",
                        nuberPPO: "$NumberPPO",
                        informalDocument: "$Informal_Document",
                        filterContractor: "$FilterContractor",
                        loanAgreementStatus: "$loanAgreementStatus",
                        typePayment: "$TypePayment",
                        chronologies: "$ArrayChronologies",
                        contactInformation: "$ContactInformation",
                        orders: "$ArrayStrings",
                    }
                },
                сarNumber: { $first: "$NumberCar" },
                carModel: { $first: "$CarModel" }
            }
        }
    ];

    const driversAggregated = await this.messageModel.aggregate(aggregation).exec();

    const drivers = driversAggregated.map(driverData => ({
        driver: driverData._id,
        carNumber: driverData.сarNumber,
        carModel: driverData.carModel,
        transportRequests: driverData.transportRequests.map(request => ({
            ...request,
            orders: request.orders.flat()
        }))
    }));

    return drivers;
}
