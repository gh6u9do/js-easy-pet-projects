// для чего этот js файл? 
// в этом файле хранится логика 

import { WeekManager } from "./WeekManager"

const diaryFieldManager = {

    "diaryFieldBlock": document.getElementById('diary-field'),

    "blurHandler": function(){

        const newDocument = {

            "userName": systemInfoManager.getUserName(),
            "text": this.diaryFieldBlock.value,
            "date":  weekManager.getSelectedDayDate()

        }

    }


}

export { diaryFieldManager }