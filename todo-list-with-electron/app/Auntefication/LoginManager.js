// для чего этот js файл?
// в этом js файле описана логика поведения страницы логина

import { sectionManager } from "../system/sectionManager.js";
import { LoginValidator } from "./LoginValidator.js";
import { systemInfoManager } from "../system/systemInfoManager.js";
import { taskLoader } from "../logic/taskLoader.js";
import { mongoDatabase } from "../db/mongoDatabase.js";
import { loader } from "../logic/loader.js";
import { currentDate } from "../logic/currentDate.js";
import { weekManager } from "../logic/WeekManager.js";

class LoginManager {
  constructor(logSection) {
    this.logSection = logSection;
    this.loginInput = document.getElementById("login-form__login");
    this.passwordInput = document.getElementById("login-form__password");
    this.loginButton = document.getElementById("login-form__goto-content");
    this.toggle = document.getElementById("login-form__toggle");

    // крафтим объект для передачи в валидатор
    const formElemObj = {
      loginInput: this.loginInput,
      passwordInput: this.passwordInput,
    };

    // биндим переключение на форму регистрации по клику на toggle
    this.toggle.addEventListener("click", (e) => {
      // скрываем секцию логина
      sectionManager.hideSection("section-login");
      sectionManager.clearInputs("section-login");

      // показываем секцию регистрации
      sectionManager.showSection("section-registration");
    });

    // создаем экземпляр валидтора
    const loginValidator = new LoginValidator(formElemObj);

    // биндим на кнопку логина валидацию
    this.loginButton.addEventListener("click", async (e) => {
      // валидация успешная - пускаем в приложение и отображаем там имя юзера
      const validateResult = await loginValidator.validate();
      if (validateResult) {
        systemInfoManager.setUserName(this.loginInput.value);
        sectionManager.hideSection("section-login");
        sectionManager.showSection('section-todo');

        // показываем прелоадер
        loader.showLoader();

        // чекаем что текущая дата совпадает с выбранной
        if(weekManager.selectedFullDate != currentDate.currentFullDate){
          // меняем fulldate и вытекающие из нее данные, выделяем цветом день
          weekManager.changeSelectedDayData(currentDate.currentFullDate);
        }

        // создаем объект, который помещаем в запрос к бд
        const tasksQuery = {
          "userName": systemInfoManager.getUserName(),
          "date" : `${currentDate.currentNumDay} ${currentDate.currentMonth + 1} ${currentDate.currentYear}`
        }
        // чекаем есть ли таски с таким именем на текущую дату
        const isExistTask = await mongoDatabase.findOne('tasks', tasksQuery);
        // если есть таски с таким именем пользователя подгружаем их из бд
        if(isExistTask != undefined){
          // скрываем кнопку показать первую таску
          document.getElementById('tasks-add-first-task').classList.add('d-none');
          // показываем tasks-header
          document.getElementById("tasks-header").classList.remove('d-none');
          // пушим таски в блок
          taskLoader.getTasksFromDb(tasksQuery);
        } else{
          document.getElementById('tasks-add-first-task').classList.remove('d-none');
        }


        // const diaryQuery = {"date": `${currentDate.currentNumDay} ${currentDate.currentMonth} ${currentDate.currentYear}`,
        // "userName": systemInfoManager.getUserName()};
        // // чекаем есть ли дневник на текущую дату
        // console.log("diary")
        // const isExistDiary = await mongoDatabase.findOne('notes', diaryQuery);
        // console.log("check")
        // // если есть, то заполняем поле дневника содержимым из бд
        // if(isExistDiary != undefined){
        //   document.getElementById('diary-field').value = isExistDiary.text;
        // }

        // убираем прелоадер
        loader.removeLoader();
      }
    });
  }
}

export { LoginManager };
