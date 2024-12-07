// для чего нужен этот класс??
// этот класс отвечает за функционал таски в списке (добавление, удаление, редактирование)

import { systemInfoManager } from "../system/systemInfoManager.js";
import { mongoDatabase } from "../db/mongoDatabase.js";
import { weekManager } from "./WeekManager.js";

class Task {
  constructor() {}

  getEmptyTaskTemplate() {
    // создаем див чтобы копировать с него элементы
    const div = document.createElement("div");

    // создаем таск контейнер
    const taskContainer = div.cloneNode();
    taskContainer.classList.add("task");
    taskContainer.dataset.id = Date.now();

    // создаем блок с номером таски
    const numTask = div.cloneNode();
    numTask.classList.add("num-task");
    numTask.textContent = "#1";
    taskContainer.appendChild(numTask);

    // создаем блок с текстом таски
    const textTask = document.createElement("textarea");
    textTask.classList.add("text-task");
    textTask.placeholder = "Enter task...";
    taskContainer.appendChild(textTask);

    // вешаем blur обработчик на блок с текстом таски
    textTask.addEventListener('blur', async (e) => {

      // ЗАДАЧА: ЗАПИСЫВАТЬ ДАТУ ВЫБРАННОГО ДНЯ В СОЗДАВАЕМУЮ ТАСКУ
      // прим. weekManager знает выбранный день

      // ищем в бд таску по taskId, если есть - редачим
      const queryId = {"taskId": taskContainer.dataset.id}
      const findResult = await mongoDatabase.findOne('tasks', queryId );
      if(findResult != undefined){
        // РЕДАЧИМ СУЩЕСТВУЮЩИЙ ОБЪЕКТ
        console.log("редачим...");
        const updateQuery = taskContainer.querySelector('.text-task').value;
        mongoDatabase.updateOne('tasks',queryId, { $set: { taskText: updateQuery } });
    
      } else{
        // создаем объект для пуша в бд
        const objectForDb =  this.getObjectForDb(taskContainer);
        mongoDatabase.pushDocument(objectForDb, 'tasks');
      }
    });

    // создаем блок с кнопкой удаления
    const deleteTaskBtn = div.cloneNode();
    deleteTaskBtn.innerHTML = ` 
    <svg xmlns="http://www.w3.org/2000/svg" color="var(--red-color)" height="1rem" width="1rem" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg> `;
    deleteTaskBtn.classList.add("delete-task");
    taskContainer.appendChild(deleteTaskBtn);

    // возвращаем получившийся элемент таски
    return taskContainer;

  }

  setNumTask(taskContainer, num){
    // находим в контейнере блок с номером таски и ставим номер из аргумента
    const numTaskBlock = taskContainer.querySelector('.num-task');
    numTaskBlock.textContent = `#${num}`;
  }

  getObjectForDb(taskContainer){
    // разбираем контейнер на части, возвращаем объект
    // получаем текст таски
    const taskText = taskContainer.querySelector('.text-task').value;
    // получаем userName
    const userName = systemInfoManager.getUserName();
    // получаем id таски
    const taskId = taskContainer.dataset.id;
    // получаем дату из weekManager, записываем в формате dd mm yy
    const date = `${weekManager.getSelectedDayDate().getDate()} ${weekManager.getSelectedDayDate().getMonth() + 1} ${weekManager.getSelectedDayDate().getFullYear()}`;
    // крафтим возвращаемый объект 
    const obj = {userName, taskText, taskId, date};
    return obj;
  }

  

}

const task = new Task();

export { task };