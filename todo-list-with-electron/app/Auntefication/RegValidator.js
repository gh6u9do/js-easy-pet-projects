// для этот js класс??
// в этом классе описывается валидатор для формы регистрации

import { alert } from "../logic/alert.js";
import { formHepler } from "./formHepler.js";


class RegValidator {
  constructor(formElemObj) {
    // деструктурируем элементы формы
    const { loginInput, passwordInput, confirmPasswordInput } = formElemObj;
    this.loginInput = loginInput;
    this.passwordInput = passwordInput;
    this.confirmPasswordInput = confirmPasswordInput;
  }

  // основная функция валидации
  async validate() {
    // чекаем что логин в порядке
    const isCorrectLogin = await this.__isCorrectLogin();
    if (!isCorrectLogin) {
      alert.show("Введите корректный логин!!!");
      formHepler.selectInput(this.loginInput);
      return false;
    }

    // чекаем что пароль в порядке
    const isCorrectPassword = await this.__isCorrectPassword();
    if (!isCorrectPassword) {
      alert.show("Введите корректный пароль (не менее 3-х символов)");
      formHepler.selectInput(this.passwordInput);
      return false;
    }

    // чекаем что поле подтвердите пароль == паролю
    const isCorrectConfirmPassword = await this.__isCorrectConfirmPassword();
    if (!isCorrectConfirmPassword) {
      alert.show("Пароли должны совпадать!");
      formHepler.selectInput(this.confirmPasswordInput);
      return false;
    }

    return true;
  }

  async __isCorrectLogin() {
    // че должна чекать эта функция?
    // чекает инпут на пустоту и на существование в бд

    // чекаем на пустоту
    if (formHepler.isEmptyInput(this.loginInput)) {
      console.log("пустой логин");
      return false;
    }

    // чекаем на существование имени в бд
    if (await formHepler.isExistInDb(this.loginInput.value, "users")) {
      console.log("совпадение в бд!");
      return false;
    }

    // все хорошо - возвращаем true
    return true;
  }

  async __isCorrectPassword() {
    // че должна чекать эта функция?
    // она чекает инпут на пустоту, а затем пароль на длину (не менее трех символов)

    // чекаем пароль на пустоту
    if (formHepler.isEmptyInput(this.passwordInput)) {
      console.log("пустой пароль");
      return false;
    }

    // чекаем пароль на длину
    if (!formHepler.isCorrectLengthInput(this.passwordInput, 3)) {
      console.log("короткий пароль");
      return false;
    }

    // если все ок - возвращаем true
    return true;
  }

  async __isCorrectConfirmPassword() {
    // что мы тут должны чекать?
    // чекаем поле на пустоту; чекаем совпадает ли значение с полем password

    // чекаем на пустоту
    if (formHepler.isEmptyInput(this.confirmPasswordInput)) {
      return false;
    }

    // чекаем на совпадение
    if (
      !formHepler.isCorrectConfirmInput(
        this.passwordInput,
        this.confirmPasswordInput
      )
    ) {
      return false;
    }

    // если все ок - возвращаем true
    return true;
  }
}

export { RegValidator };
