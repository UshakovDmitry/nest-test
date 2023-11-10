вот для этого запроса нужно описать dto
  @Post('/correction') (@Body() dto:) {
}

вот что он должен получать в body 
{
    "Сap": {
        "DateDoc": "20231102"
    },
    "items": [
        {
            "Driver": "681012301869",
            "Duty": true,
            "Date": "2",
            "Values": true
        }
    ],
    "history" : {
        "UserIIN": "681012301869",
        "UserName" : "Абдуллин Р.Р.",
        // Дата и время изменения
        "date": "2023-11-02",

    }
