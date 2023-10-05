export interface IEmailField {
  label?: string;
  input: {
    type: string;
    placeholder: string;
    value: string;
    isError: boolean;
    isDisabled: boolean;
    required: boolean;
    body_key?: string;
  };
  helper: {
    value: string;
    isActive: boolean;
  };
  isEmpty: () => void;
  checkValid?: () => void;
  setValue: (value: string) => void;
}

export class EmailField implements IEmailField {
  label?: string;
  input: {
    type: string;
    placeholder: string;
    value: string;
    isError: boolean;
    required: boolean;
    isDisabled: boolean;
    body_key?: string;
  };

  helper: {
    value: string;
    isActive: boolean;
  };

  constructor(object: {
    label: string;
    input: {
      type: string;
      placeholder: string;
      value: string;
      isError: boolean;
      required: boolean;
      isDisabled: boolean;
      body_key: string;
    };
    helper: {
      value: string;
      isActive: boolean;
    };
  }) {
    for (const key in object) {
      this[key] = object[key];
    }
  }

  setValue(value: string): void {
    this.input.value = value;
    this.clearError();
    if (this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = 'Введите корректный email';
    }
  }

  isEmpty(): void {
    this.clearError();
    if ((!this.input.value && !this.input.value.length) || this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = this.input.value.length
        ? 'Введите корректный email'
        : 'Поле не должно быть пустым';
    }
  }

  // При вводе значений в инпут проверяем стал ли он валидным
  checkValid(): boolean {
    console.log('checkValid');
    
    return !this.input.value.includes('@');
  }

  clearError(): void {
    this.input.isError = false;
    this.helper.isActive = false;
    this.helper.value = '';
  }
}
