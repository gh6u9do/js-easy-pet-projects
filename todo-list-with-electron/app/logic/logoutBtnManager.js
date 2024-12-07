// для чего этот js файл? 
/* 
    в этом файле хранится логика для работы логаут кнопки
*/
import { sectionManager } from "../system/sectionManager.js";
import { systemInfoManager } from "../system/systemInfoManager.js";
import { diaryField } from "./diaryField.js";


const logOutBtnManager = {

    logOut(){
        // скрываем секцию todo
        sectionManager.hideSection('section-todo');
        // чистим секцию todo
        sectionManager.clearToDoSection();
        
        // чистим рег секцию 
        sectionManager.clearInputs('section-registration');
        // чистим логин секцию перед показом
        sectionManager.clearInputs('section-login');
        // показываем section-login
        sectionManager.showSection('section-login');
        // изменяем состояние в systemJson
        systemInfoManager.logOutUser();
    }

}


export {logOutBtnManager}