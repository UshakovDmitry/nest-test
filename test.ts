
  после преобразования я хочу обрабатывать эти данные и присваивать значения в сущность User которая есть в моем проекте 
вот что я имею после парсинга токена
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

вот моя сущность User 
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  fullName: string;
  iin: string;

  constructor(userModelData?: IUser) {
    this.fullName = userModelData?.fullName ? userModelData.fullName : '',
    this.iin = userModelData?.iin ? userModelData.iin : '';
  }
}


вот метод авторизации 
  async authorize(): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('client_id', 'DispatcherWorkplace');
      formData.append('client_secret', 'secret');
      formData.append('grant_type', 'password');
      formData.append('username', this.model.email);
      formData.append('password', this.model.password);
      formData.append('scope', 'myAPIs');

      const response = await fetch('https://auth3.next.local/connect/token', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // this.saveToken(data.access_token);
        storeProviderSetValue('token', data.access_token);
        const dataToken = this.parseJwt(data.access_token); 
        console.log(dataToken, 'dataToken');
        
        // router.push('/dashboard');
        return true;
      } else {
        console.error('Авторизация не удалась:', await response.text());
        return false;
      }
    } catch (error: Error | any) {
      console.error(error.message);
      return false;
    }
  }


после парсинга я хочу заполнить User
  saveUser(user: IUser) {
   тут нужно заполнить данные в соответсвии с интерфейсом
export interface IUser {
  fullName: string;
  iin: string;
}


  fullName: `"family_name" "given_name"`
  iin:  "profile"


  }
