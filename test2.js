import { AuthModel } from './auth.model'; // Поправьте путь импорта, если это необходимо

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

  // ... (остальные методы)
}
