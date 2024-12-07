// для чего этот js файл? 
// в этом файле содержится логика по работе с секциями (окнами приложения), 
// здесь есть функции для скрытия и отображения

import { diaryField } from "../logic/diaryField.js";

const sectionManager = {

    showedSection: null,

    hideSection(idSection){
        document.getElementById(idSection).classList.add('d-none');
        this.showedSection = null;
    },

    showSection(idSection){
        document.getElementById(idSection).classList.remove('d-none');
        this.showedSection =  idSection;
    },

    isHideSection(idSection){
        if(document.getElementById(idSection).classList.contains('d-none')){
            return true;
        } else{
            return false;
        }
    },

    clearInputs(idSection){
        const section = document.getElementById(idSection);
        const inputs = section.querySelectorAll('.form-input');

        inputs.forEach(element => {
            element.value = "";
        });
    }, 

    clearToDoSection(){
        // убираем taskHeader
        document.getElementById('tasks-header').classList.add('d-none');
        // чистим taskList
        document.getElementById('tasks-list').innerHTML= "";
        document.getElementById('tasks-list').classList.add('d-none');
        // чистим diaryField
        diaryField.clear();
    }

}

export { sectionManager }

