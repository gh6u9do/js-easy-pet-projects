// для чего этот js класс?? 
// этот js класс хранит и изменяет информацию о неделе, внутри которой находится выбранный день
// изначально таковой неделей является неделя текущего дня


import { currentDate } from "./currentDate.js";
import { systemInfoManager } from "../system/systemInfoManager.js";
import { mongoDatabase } from "../db/mongoDatabase.js";
import { taskLoader } from "./taskLoader.js";
import { loader } from "./loader.js";

const namesDate = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];

class WeekManager{

    constructor({fullDate, nameDay}){

        this.selectedWeekArray = [
            {
                "name": "mon",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "tue",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "wed",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "thu",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "fri",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "sat",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "sun",
                "date": 0,
                "isSelected": false
            }
        ];

        this.selectedFullDate = fullDate;
        this.selectedMonth = this.selectedFullDate.getMonth();
        this.selectedYear = this.selectedFullDate.getFullYear();
        this.selectedNameDay = nameDay;

        // находим в объекте недели выбранный день и заполняем его данными
        const selectedDayInArray = this.selectedWeekArray.find((el) => el.name == nameDay);
        selectedDayInArray.date = this.selectedFullDate;
        selectedDayInArray.isSelected = true;

        // заполняем массив недели внутри этого класса
        this.__fillSelectedWeekObject();
    }

    setDefaultWeekArray(){
        this.selectedWeekArray = [
            {
                "name": "mon",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "tue",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "wed",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "thu",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "fri",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "sat",
                "date": 0,
                "isSelected": false
            },
            {
                "name": "sun",
                "date": 0,
                "isSelected": false
            }
        ];
    }

    selectCurrentDayOfWeek(){
        document.querySelector(`.${this.selectedNameDay}`).classList.add('selected-day');
    };

    unselectDayOfWeek(){
        document.querySelector(`.${this.selectedNameDay}`).classList.remove('selected-day');
    };

    getSelectedDayDate(){
        return this.selectedWeekArray.find((el) => el.isSelected == true).date;
    }


    /**
     *  метод предназначен для смены данных selectedDate внутри класса извне
    **/
    changeSelectedDayData(fullDate){
        // убираем выделенный день
        this.selectedWeekArray.find((el) => el.isSelected == true).isSelected = false;
        this.unselectDayOfWeek();

        // меняем хранимый fulldate
        this.selectedFullDate = fullDate;
        this.selectedMonth = fullDate.getMonth();
        this.selectedYear = fullDate.getYear();
        this.selectedNameDay = namesDate[fullDate.getDay()];

        // выделяем нужный день
        this.selectedWeekArray.find((el) => el.name == this.selectedNameDay).isSelected = true;
        this.selectCurrentDayOfWeek();

        console.log(this);
    }

    /** 
     * метод изменяет выбранный день по клику на название дня недели в меню слева
     **/
    changeSelectedDayOnLeftMenuCLick(nameDay){
        this.unselectDayOfWeek(this.selectedNameDay);
        this.selectedNameDay = nameDay;
        this.selectCurrentDayOfWeek();

        // вытаскиваем объект выбранного дня
        const selectedObjDate = this.selectedWeekArray.find((el) => el.name == nameDay);
        // вызываем функцию смены даты
        this.changeSelectedWeek({fullDate: selectedObjDate.date, nameDay: selectedObjDate.name});

    }

    getSelectedWeekArray(){
        return this.selectedWeekArray;
    }


    __fillSelectedWeekObject(){
        // если понедельник isSelected        
        if(this.selectedWeekArray[0].isSelected){
            let bufferDate = this.selectedWeekArray[0].date;
            // пробегаемся по массиву и заполняем дату
            for(let i = 1; i < this.selectedWeekArray.length; i++) {
                let newDate = new Date(bufferDate.getFullYear(), bufferDate.getMonth(), bufferDate.getDate() + 1);
                this.selectedWeekArray[i].date = newDate;
                bufferDate = newDate;  
            }

            // если воскресенье isSelected
        } else if(this.selectedWeekArray.at(-1).isSelected){

            let bufferDate = this.selectedWeekArray[this.selectedWeekArray.length-1].date;

            // пробегаемся по массиву в обратную сторону и заполянем дату
            for(let i = this.selectedWeekArray.length -2; i >= 0; i--){
                let newDate = new Date(bufferDate.getFullYear(), bufferDate.getMonth(), bufferDate.getDate() - 1);
                this.selectedWeekArray[i].date = newDate;
                bufferDate = newDate;  
            }

            // если isSelected не понедельник и не воскресенье
        } else {

            let bufferDate = this.selectedWeekArray.find((obj) => obj.isSelected).date;

            // находим индекс выбранного элемента
            const bufferIndex = this.selectedWeekArray.findIndex((obj) => obj.isSelected);

            // циклом проходим сначала bufferIndex до нуля, затем от bufferIndex до конца
            for(let i = bufferIndex - 1; i>=0; i--){
                let newDate = new Date(bufferDate.getFullYear(), bufferDate.getMonth(), bufferDate.getDate() - 1);
                this.selectedWeekArray[i].date = newDate;
                bufferDate = newDate;  
            }

            // возвращаем bufferDate исходное значение
            bufferDate = this.selectedWeekArray.find((obj) => obj.isSelected).date;

            for(let i = bufferIndex + 1; i < this.selectedWeekArray.length; i++){
                let newDate = new Date(bufferDate.getFullYear(), bufferDate.getMonth(), bufferDate.getDate() + 1);
                this.selectedWeekArray[i].date = newDate;
                bufferDate = newDate;  
            }
        }
    }

    async changeSelectedWeek({fullDate, nameDay}){
        loader.showLoader();

        // убираем выделение старого дня
        this.unselectDayOfWeek();
        // приводим к дефолтным значениям selectedWeekArray    
        this.setDefaultWeekArray();
        // изменяем fulldate выбранного дня
        this.selectedFullDate = fullDate;
        // изменяем selectedMonth
        this.selectedMonth = this.selectedFullDate.getMonth();
        // изменяем selectedYear
        this.selectedYear = this.selectedFullDate.getFullYear();
        // записываем имя выбранного дня
        this.selectedNameDay = nameDay;

        // находим в объекте недели выбранный день и заполняем его данными
        const selectedDayInArray = this.selectedWeekArray.find((el) => el.name == nameDay);
        selectedDayInArray.date = this.selectedFullDate;
        selectedDayInArray.isSelected = true;

        // заполняем массив недели внутри этого класса
        this.__fillSelectedWeekObject();

        // выделяем новый выбранный день
        this.selectCurrentDayOfWeek();

        // подумать как называется дальнейший процесс -> вынести в более красивую функцию

        // создаем объект, который помещаем в запрос к бд
        const tasksQuery = {
            "userName": systemInfoManager.getUserName(),
            "date" : `${this.selectedFullDate.getDate()} ${this.selectedMonth + 1} ${this.selectedYear}`
        }

        // записываем результат поиска по запросу 
        const isExistTask = await mongoDatabase.findOne('tasks', tasksQuery);
        if(isExistTask != undefined){
            // скрываем кнопку показать первую таску
            document.getElementById('tasks-add-first-task').classList.add('d-none');
            // показываем tasks-header
            document.getElementById("tasks-header").classList.remove('d-none');
            // пушим таски в блок
            taskLoader.getTasksFromDb(tasksQuery);
        } else{
            //  необходимо чистить taskList 
            document.getElementById('tasks-list').innerHTML = "";
            document.getElementById('tasks-list').classList.add('d-none');
            // скрываем task-header
            document.getElementById("tasks-header").classList.add('d-none');
            // показвыаем кнопку добавить первую таску
            document.getElementById('tasks-add-first-task').classList.remove('d-none');
        }

        loader.removeLoader();
    }
}

// крафтим экземпляр класса, чтобы именно его импортировать
const weekManager = new WeekManager(
    {fullDate:currentDate.getFullCurrentDate(),nameDay: currentDate.getNameCurrentDay() }
);

export {WeekManager, weekManager};