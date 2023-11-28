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
    console.log(this.model.email, this.model.password);
    
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
        const dataToken = this.parseJwt(data.access_token);
        console.log(dataToken, 'dataToken');
        
        const transformDataToken: IUser = this.transformDataToken(dataToken);
        this.saveUser(transformDataToken);
        router.push('/dashboard');
        this.model.email = '';
        this.model.password = '';
        return true;
      }else {
        const errorData = await response.json();
        // Получение тела ответа в формате JSON
        
        const errorMessage = this.validateError(errorData); // Получение сообщения об ошибке с помощью функции validateError
        this.model.isModalError = true;
        this.model.errorMsg = errorMessage;
        console.error(errorMessage); // Вывод сообщения об ошибке в консоль
        
        return false;
      }
    } catch (error: Error | any) {
      console.error('Ошибка при авторизации:', error);
      return false;
    }
  }


  validateError = (errorData: any) => {
    switch (errorData.errorDescription) {
      case 'invalid_username_or_password':
        return 'Не валидный логин или пароль';
      
      // Добавьте дополнительные case для обработки других возможных ошибок, если необходимо
      
      default:
        return 'Произошла неизвестная ошибка'; // Сообщение по умолчанию для ошибок, которые не обрабатываются явно
    }
  };

  closeErrorModal () {
    this.model.isModalError = false;
  }

  saveToken(token) {
    tokenCRUDService.createToken(token);
  }
  saveUser(user: IUser) {
    userCRUDService.createUser(user);
  }

  transformDataToken(dataToken: any) {
    let position = '';
    if (Array.isArray(dataToken.website) && dataToken.website.length > 0) {
      position = dataToken.website.join(', ');
    }
  
    // Проверка наличия свойства role в токене
    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    if (!dataToken[roleClaim]) {
      throw new Error('В токене отсутствует свойство role, что означает отсутствие роли у пользователя');
        }
  
    const user: IUser = {
      fullName: `${dataToken.family_name} ${dataToken.given_name}`,
      position: position,
      iin: dataToken.profile,
      role: dataToken[roleClaim], // Добавление свойства role
    };
    return user;
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
}


Я хочу если срабатывает это условие 
if (!dataToken[roleClaim]) {
      throw new Error('В токене отсутствует свойство role, что означает отсутствие роли у пользователя');
        }
то выдавать ошибку авторизации и запрещать дальнейшее продвижение пользователя в приложении 
также хочу чтобы this.model.isErrorNoAccess = true;
то 
