// для чего этот js класс??
// в этом классе описана логика регистрации

import { formHepler } from "./formHepler.js";
import { RegValidator } from "./RegValidator.js";
import { mongoDatabase } from "../db/mongoDatabase.js";
import { sectionManager } from "../system/sectionManager.js";
import { systemInfoManager } from "../system/systemInfoManager.js";
import { loader } from "../logic/loader.js";
import { weekManager } from "../logic/WeekManager.js";
import { currentDate } from "../logic/currentDate.js";

class RegManager {
  constructor(regSection) {
    // записываем элементы формы в this
    this.regSection = regSection;
    this.loginInput = document.getElementById("registration-form__login");
    this.passwordInput = document.getElementById("registration-form__password");
    this.confirmPasswordInput = document.getElementById(
      "registration-form__confirm-password"
    );
    this.registrationButton = document.getElementById(
      "registration-form__goto-content"
    );
    this.toggle = document.getElementById("registration-form__toggle");

    // создаем объект с элементами формы для компактной передачи в валидатор
    const formElemObj = {
      loginInput: this.loginInput,
      passwordInput: this.passwordInput,
      confirmPasswordInput: this.confirmPasswordInput,
    };

    // биндим клик на toggle
    this.toggle.addEventListener("click", (e) => {
      // скрываем секцию регистрации
      sectionManager.hideSection("section-registration");
      sectionManager.clearInputs("section-registration");

      // показываем секцию логина
      sectionManager.showSection("section-login");
    });

    // создаем экземпляр валидатора
    const regValidator = new RegValidator(formElemObj);

    // биндим на кнопку регистрации валидацию
    this.registrationButton.addEventListener("click", async (e) => {

      // чекаем чтобы даты совпадали для корректного добавления в бд
      if(weekManager.selectedFullDate != currentDate.currentFullDate){
        // меняем fulldate и вытекающие из нее данные, выделяем цветом день
        weekManager.changeSelectedDayData(currentDate.currentFullDate);
      }

      loader.showLoader();
      // если валидация успещная - регистрируем пользователя в бд
      const validateResult = await regValidator.validate();
      if (validateResult) {
        const userObj = formHepler.createUserObjectForDb(
          formElemObj.loginInput,
          formElemObj.passwordInput
        );

        await mongoDatabase.pushDocument(userObj, "users");

        // обновляем инфу в systemInfoManager
        systemInfoManager.setUserName(this.loginInput.value);

        // СКРЫВАЕМ ОКНО РЕГИСТРАЦИИ И ПОКАЗЫВАЕМ ТАСК ЛИСТ
        sectionManager.hideSection("section-registration");
        sectionManager.showSection("section-todo");

        // показываем кнопку добавить первую таску
        document.getElementById('tasks-add-first-task').classList.remove('d-none');
      }
      loader.removeLoader();
    });
  }
}

export { RegManager };
