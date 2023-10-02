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








No overload matches this call.
  Overload 1 of 2, '(pipeline?: PipelineStage[], options?: AggregateOptions): Aggregate<any[]>', gave the following error.
    Argument of type '({ $sort: { Driver: number; }; $group?: undefined; } | { $group: { _id: string; transportRequests: { $push: { number: string; date: string; dateCreated: string; organization: string; documentStatus: string; ... 8 more ...; orders: string; }; }; сarNumber: { ...; }; carModel: { ...; }; }; $sort?: undefined; })[]' is not assignable to parameter of type 'PipelineStage[]'.
      Type '{ $sort: { Driver: number; }; $group?: undefined; } | { $group: { _id: string; transportRequests: { $push: { number: string; date: string; dateCreated: string; organization: string; documentStatus: string; ... 8 more ...; orders: string; }; }; сarNumber: { ...; }; carModel: { ...; }; }; $sort?: undefined; }' is not assignable to type 'PipelineStage'.
        Type '{ $sort: { Driver: number; }; $group?: undefined; }' is not assignable to type 'PipelineStage'.
          Type '{ $sort: { Driver: number; }; $group?: undefined; }' is not assignable to type 'Sort'.
            Types of property '$sort' are incompatible.
              Type '{ Driver: number; }' is not assignable to type 'Record<string, 1 | Meta | -1>'.
                Property 'Driver' is incompatible with index signature.
                  Type 'number' is not assignable to type '1 | Meta | -1'.
  Overload 2 of 2, '(pipeline: PipelineStage[]): Aggregate<any[]>', gave the following error.
    Argument of type '({ $sort: { Driver: number; }; $group?: undefined; } | { $group: { _id: string; transportRequests: { $push: { number: string; date: string; dateCreated: string; organization: string; documentStatus: string; ... 8 more ...; orders: string; }; }; сarNumber: { ...; }; carModel: { ...; }; }; $sort?: undefined; })[]' is not assignable to parameter of type 'PipelineStage[]'.ts(2769)
const aggregation: ({
    $sort: {
        Driver: number;
    };
    $group?: undefined;
} | {
    $group: {
        _id: string;
        transportRequests: {
            $push: {
                number: string;
                date: string;
                dateCreated: string;
                organization: string;
                documentStatus: string;
                ... 8 more ...;
                orders: string;
            };
        };
        сarNumber: {
            ...;
        };
        carModel: {
            ...;
        };
    };
    $sort?: undefined;
})[]
