хочу добавить новое поле в User 



  saveUserToLocalStorage(dataToken: any) {
    const user: IUser = {
      fullName: `${dataToken.family_name} ${dataToken.given_name}`,
      position: dataToken.role,
      iin: dataToken.website,
    };


export interface IUser {
  fullName: string;
  position: string;
  iin: string;
}

но проблема в том что website выглядит вот так 
[
    "Отдел разработки ПО",
    "Разработчик ПО"
]

я хочу из этого массива получить одну строку "Отдел разработки ПО, Разработчик ПО"
тем самы пройтись по всем  элементам массива и сдедлать их одной строкой рзделяя их запятой и пробелом



вот исходные данные dataToken
{
    "client_id": "DispatcherWorkplace",
    "idp": "local",
    "locale": "Алматы",
    "nickname": "",
    "auth_time": 1697794888,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "C8994BAA-BD79-4DA5-AE03-794F5F11C984",
    "family_name": "Ушаков",
    "given_name": "Дмитрий",
    "website": [
        "Отдел разработки ПО",
        "Разработчик ПО"
    ],
    "profile": "950408050374",
    "nbf": 1697773287,
    "exp": 1697816487,
    "iss": "http://auth3.next.local",
    "scope": [
        "myAPIs"
    ],
    "aud": [
        "myAPIs",
        "http://auth3.next.local/resources"
    ],
    "amr": [
        "pwd"
    ]
}
