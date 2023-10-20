import { AuthModel } from './auth.model';
import { IUser } from '../../domain/interfaces/user.interface';
import { User } from '../../domain/entities/user';
import { tokenCRUDService } from '../../domain/services/tokenCRUD.service';
import { userCRUDService } from '../../domain/services/userCRUD.service';
import { useGetApi } from '../../domain/services/getHTTP.service';
import { usePostApi } from '../../domain/services/postHTTP.service';
import { storeProviderSetValue } from '../../domain/providers/store.provider';

import router from '../../router';
export class AuthViewModel {
  model: AuthModel;

  constructor(model: AuthModel) {
    this.model = model;
  }

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

  parseJwt(token) {
    try {
      // Получить payload токена
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      // Декодировать payload
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Ошибка при разборе токена:', error);
      return null;
    }
  }

  saveUser(user: IUser) {}

  setEmail(value: string) {
    this.model.email = value;
  }
  setPassword(value: string) {
    this.model.password = value;
  }

  handleLogin = () => {
    // Проверка полей на правильность заполнения
    let allFieldsValid = true;
    this.model.fields.forEach((field) => {
      if (field.isEmpty()) {
        allFieldsValid = false;
      }
    });

    // Если все поля заполнены верно, продолжаем вход
    if (allFieldsValid) {
      this.authorize();
    }
  };
}
