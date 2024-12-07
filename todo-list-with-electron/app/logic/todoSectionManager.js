// для чего этот js файл?
// в этом файле содержится логика секции todo

import { currentDate } from "./currentDate.js";
import { WeekManager, weekManager } from "./WeekManager.js";
import { logOutBtnManager } from "./logoutBtnManager.js";
import { TasksListManager } from "./TaskListManager.js";
import { task } from "./Task.js";
import { mongoDatabase } from "../db/mongoDatabase.js";
import { systemInfoManager } from "../system/systemInfoManager.js";
import { calendarWindow } from "./calendarWindow.js";

const taskListManager = new TasksListManager(
  document.getElementById("tasks-list")
);


const todoSectionManager = {

  setActualDataInSection() {
    // выделяем текущий день на верстке
    weekManager.selectCurrentDayOfWeek();
    // записываем актуальную дату в секцию
    currentDate.setActualDataInToDoSection();
  },



  // вешаем все обработчики на элементы
  setHandlers() {


    // вешаем обработчик на logout btn
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", (e) => {
      logOutBtnManager.logOut();
    });


    // вешаем обработчик на calendarBtn (с помощью call задаем контекст)
    const calendarBtn = document.getElementById("calendar-btn");
    calendarBtn.addEventListener('click', (e) => {
      if(calendarWindow.calendarWindow.classList.contains('d-none')){
        calendarWindow.showCalendarWindow.call(calendarWindow);
      } else{
        calendarWindow.hideCalendarWindow.call(calendarWindow);
      }
    })

    // находим кнопку добавить ПЕРВУЮ таску и вешаем на неё обработчик
    const addFirstTaskBtn = document.getElementById("tasks-add-first-task");
    addFirstTaskBtn.addEventListener("click", function handler() {
      // скрываем кнопку
      addFirstTaskBtn.classList.add("d-none");

      // показываем таск header
      const tasksHeader = document.getElementById("tasks-header");
      tasksHeader.classList.remove("d-none");

      // показываем таск контейнер
      const tasksListContainer = document.getElementById("tasks-list");
      tasksListContainer.classList.remove("d-none");

      // получаем шаблон таски и передаем его в метод для добавления таски
      const taskTemplate = task.getEmptyTaskTemplate();
      taskListManager.addElement(taskTemplate);
    });



    // находим кнопку добавить таску, вешаем на неё обработчик
    const addTaskBtn = document.getElementById("add-task-btn");
    addTaskBtn.addEventListener("click", (e) => {
      // находим блок с тасками
      const taskListBlock = document.getElementById("tasks-list");

      // получаем template и кладем его в taskList
      const taskTemplate = task.getEmptyTaskTemplate();
      task.setNumTask(taskTemplate, taskListBlock.children.length + 1);
      taskListManager.addElement(taskTemplate);
    });



    // делигированием вешаем обработчик на кнопки удаления таски
    const taskListBlock = document.getElementById("tasks-list");
    taskListBlock.addEventListener("click", async (e) => {
      // чекаем что клик именно по delete-task
      if (e.target.closest(".delete-task")) {
        // получаем айди блока таски
        const taskId = e.target.closest(".task").dataset.id;

        // передаем айди для удаления из списка и получаем индекс удаленного элемента
        const indexDeleteElem = taskListManager.removeElement(taskId);

        // удаляем из бд
        await mongoDatabase.deleteOne("tasks", {
          userName: systemInfoManager.getUserName(),
          taskId: taskId,
        });
        console.log("удалили из бд!");

        // если лист после удаления пуст - показыаем кнопку добавления, скрываем лишние элементы
        if (taskListManager.checkListOnEmpty()) {
          document
            .getElementById("tasks-add-first-task")
            .classList.remove("d-none");

          document.getElementById("tasks-header").classList.add("d-none");
          taskListManager.hideTasksListBlock();

          // лист не пуст - если удалили первый элемент ренумируем весь список
        } else if (indexDeleteElem == 0) {
          taskListManager.renumTasks();

          // если удалили не первый элемент
        } else {
          taskListManager.renumFromIndex(indexDeleteElem);
        }
      }
    });


    // обрабатываем клики на левое меню week
    const leftBar = document.getElementById("week");
    leftBar.addEventListener("click", (e) => {
      // что тут должно быть?
      // 1) чекаем является ли выбранный день текущим, если да то нихуя не делаем // DONE
      // 2) если день другой, тогда меняем

      if (
        !e.target.classList.contains("day-of-week") ||
        e.target.classList.contains("selected-day")
      ) {
        return;
      }

      weekManager.changeSelectedDayOnLeftMenuCLick(e.target.textContent.toLowerCase());
    });


    
    // вешаем обработчик на diary-field
    // const diaryField = document.getElementById("diary-field");
    // diaryField.addEventListener("blur", async (e) => {
    //   // крафтим документ для пуша
    //   const currentDate = weekManager.getSelectedDayDate();
    //   const newDocument = {
    //     userName: systemInfoManager.getUserName(),
    //     text: diaryField.value,
    //     date: `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`,
    //   };

    //   // чекаем есть ли запись на эту дату
    //   const res = await mongoDatabase.findOne('notes', {"userName": systemInfoManager.getUserName()  , "date": newDocument.date});

    //   // если пустота, то добавляем
    //   if(res == undefined){
    //     await mongoDatabase.pushDocument(newDocument, "notes");
    //   } else {
    //     await mongoDatabase.updateOne('notes', {"date": newDocument.date}, { $set: {text: newDocument.text} });
    //   }
      
    // });
  },
};

export { todoSectionManager };
