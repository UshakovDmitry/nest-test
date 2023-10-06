const handleLogin = () => {
  // Проверка полей на правильность заполнения
  let allFieldsValid = true;
  model.fields.forEach(field => {
    if (field.isEmpty()) {
      allFieldsValid = false;
    }
  });

  // Если все поля заполнены верно, продолжаем вход
  if (allFieldsValid) {
    localStorage.setItem("isLogin", "true");
    router.push("/");
  }
}


isEmpty(): boolean {
  if (!this.input.value.length) {
    this.helper.isActive = true;
    this.input.isError = true;
    this.helper.value = "Поле не должно быть пустым";
    return true;
  }
  return false;
}
