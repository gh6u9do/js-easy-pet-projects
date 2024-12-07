// для чего этот js файл? 
/*
    в этом js файле описана логика подгрузки задач из бд по логину
*/

import { mongoDatabase } from "../db/mongoDatabase.js";
import { task } from "./Task.js";

const taskLoader = {

    async getTasksFromDb(query){
        // получаем все таски по получаемому запросу
        const tasksArray = await mongoDatabase.findMany('tasks',query);

        // показываем taskList
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = "";
        tasksList.classList.remove('d-none');

        // циклом перебираем масссив таск и создаем таски с текстом из массива
        for(let i = 0; i<tasksArray.length; i++){
            // создаем пустой блок таски
            const taskTemplate = task.getEmptyTaskTemplate();
            // редачим id
            taskTemplate.dataset.id = tasksArray[i].taskId;
            // добавляем текстовый контент из бд
            taskTemplate.querySelector('.text-task').textContent = tasksArray[i].taskText;
            // добавляем нумерацию
            taskTemplate.querySelector('.num-task').textContent = `#${i+1}`;
            // пушим таску в список
            tasksList.append(taskTemplate);
        }

    }, 


}

export {taskLoader}