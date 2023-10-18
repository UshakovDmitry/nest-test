import {  AuthModel } from './auth.model';
import { IUser } from '../../domain/interfaces/user.interface';
import { User } from '../../domain/entities/user';
import { tokenCRUDService } from '../../domain/services/tokenCRUD.service';
import { userCRUDService } from '../../domain/services/userCRUD.service';
import { useGetApi } from '../../domain/services/getHTTP.service';
import { usePostApi } from '../../domain/services/postHTTP.service';

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
        this.saveToken(data.access_token);
        return true;
      } else {
        console.error('Authorization failed:', await response.text());
        return false;
      }
    } catch (error: Error | any) {
      console.error(error.message);
      return false;
    }
  }

  saveToken(token: string) {
    tokenCRUDService.createToken(token);
  }

  saveUser(user: IUser) {
    userCRUDService.createUser(user);
  }

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


Отлично
теперь если ответ 200 то я сохраняю токен в локальном хранилище верно?
