У меня есть массив вот с такими элемаентами 

   {
            "QuantityPlaces": "3",
            "LoadingCapacity": "1 500",
            "MaximumLoadLength": "2 970",
            "MaximumCargoWidth": "1 900",
            "MaximumLoadHeight": "2 160",
            "RegistrationNumber": "M121237",
            "City": "Актау",
            "Brandcar": [
                {
                    "Brand": "ГАЗ-3302",
                    "Imei": ""
                }
            ],
            "LoadType": [
                {
                    "Type": "NORMAL_TRUCK"
                },
                {
                    "Type": "TAIL_LIFT"
                }
            ],
            "WorkingSchedule": [
                {
                    "TimeWindow": "09:00:00-18:00:00",
                    "RigidTimeWindow": "Да"
                }
            ]
        },

я хочу преобразовать к вот такому виду

{
       carBrand: Brandcar.Brand ,
       carNumber: RegistrationNumber,
       carVolume : (MaximumLoadLength * MaximumCargoWidth * MaximumLoadHeight) / 1000000,
       loadingCapacity : LoadingCapacity,
       city:City,
       timeWindow: WorkingSchedule.TimeWindow
}






