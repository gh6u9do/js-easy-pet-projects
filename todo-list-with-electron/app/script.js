import { TasksListManager } from "./logic/TaskListManager.js";
import { LoginManager } from "./Auntefication/LoginManager.js";
import { RegManager } from "./Auntefication/RegManager.js";
import { todoSectionManager } from "./logic/todoSectionManager.js";

const regManager = new RegManager(document.getElementById("section-registration"));
const loginManager = new LoginManager(document.getElementById("section-login"));

const taskListManager = new TasksListManager(document.getElementById("tasks-list"));

// записываем в секцию todo актуальную дату
todoSectionManager.setActualDataInSection();
// одним методом вешаем обработчики связанные с секцией todo
todoSectionManager.setHandlers();