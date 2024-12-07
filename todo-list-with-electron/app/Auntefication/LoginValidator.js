// для чего это js класс? 
// в этом классе описывается валидатор для формы логина

import { alert } from "../logic/alert.js";
import { formHepler } from "./formHepler.js";

class LoginValidator{

    constructor(formElemObj){
        // деструктуризируем элементы формы
        const {loginInput, passwordInput} = formElemObj;
        this.loginInput = loginInput;
        this.passwordInput = passwordInput;
    }

    // основная функция валидации
    async validate(){

        // чекаем что логин в порядке
        const isCorrectLogin = await this.__isCorrectLogin();
        if(!isCorrectLogin){
            alert.show("Введите корректный логин!!!");
            formHepler.selectInput(this.loginInput);
            return false;
        }

        // чекаем что пароль в порядке
        const isCorrectPassword = await this.__isCorrectPassword();
        if(!isCorrectPassword){
            alert.show("Введите корректный пароль!!!");
            formHepler.selectInput(this.passwordInput);
            return false;
        }

        // чекаем что пользователь с такими данными существует в db
        const isUserExist = await this.__isUserExist();
        if(!isUserExist){
            alert.show("Неправильный логин или пароль!!!");
            return false;
        }

        // все круто - возвращаем true
        return true;
    }




    async __isCorrectLogin(){
        // чекаем на пустоту
        if (formHepler.isEmptyInput(this.loginInput)) {
            return false;
        }
        // все хорошо - возвращаем true
        return true;
    }

    async __isCorrectPassword(){
        // чекаем на пустоту
        if(formHepler.isEmptyInput(this.passwordInput)){
            return false;
        }
        // если все хорошо возвращаем true
        return true;

    }

    async __isUserExist(){
        // получаем объект запроса из данных с формы
        const query = {
            "login": this.loginInput.value,
            "password": this.passwordInput.value
        }
        // получаем результат по запросу
        const res = await formHepler.isMatchLoginData(query);
        return res;
    }


}

export { LoginValidator }