import { type AuthModel } from './auth.model';
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

  async authorize(formData: FormData): Promise<boolean> {
    try {
тут через fetch
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
  тут вызов authorize
      
    }
  };
}



