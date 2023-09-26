async getMessagesByDrivers(): Promise<any[]> {
    return await this.messageModel.aggregate([
        {
            $group: {
                _id: '$Driver',
                orders: {
                    $push: {
                        number: "$Number",
                        date: "$Date",
                        organization: "$Organization",
                        documentStatus: "$DocumentStatus",
                        informal_document: "$Informal_Document",
                        sku_weight: "$SKU_Weight",
                        details: "$ArrayStrings",
                        contactInformation: "$ContactInformation"
                    }
                }
            }
        },
        {
            $project: {
                driver: '$_id',
                orders: 1,
                _id: 0
            }
        }
    ]).exec();
}
