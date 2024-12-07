// для чего это js файл? 
// в этом файле содержится класс CalendarWindow - логика работы calendarWindow, и экземлпяр этого класса

import { currentDate } from "./currentDate.js";
import { weekManager } from "./WeekManager.js";


class CalendarWindow{

    constructor(id){
        // находим блок calendarWindow
        this.calendarWindow = document.getElementById(id);
        // находим блок monthName
        this.monthName = document.querySelector('.calendar-header__month-name');

        // находим стрелочку идущую вперед по месяцам
        this.monthUpArrow = document.querySelector('.calendar-header__monthUp');
        this.monthUpArrow.addEventListener('click',(e)=> {
            this.forwardMonth();
            this.setMonthString();
            this.fillMonthField();
        });
        // находим стрелочку идущую назад по месяцам
        this.monthDownArrow = document.querySelector('.calendar-header__monthDown');
        this.monthDownArrow.addEventListener('click', (e)=> {
            this.backwardMonth();
            this.setMonthString();
            this.fillMonthField();
        })

        // записываем номер текущего месяца как изначальное значение (0-11)
        this.showedMonthNum = currentDate.currentMonth;
        // записываем отображаемый год
        this.showedYear = currentDate.currentYear;
        // изначально устанавливаем месяц и год на текущий момент
        this.setMonthString();
        // заполняем календарь числами
        this.fillMonthField();


        // делегированием ставим обработчик на клик по числу
        const calendarDays = document.getElementById('calendar-days');
        calendarDays.addEventListener('click', (e)=>{
            if(e.target.classList.contains('calendar-day')){
                this.selectDayHandler(e);
            }
        })

        // вешаем обработчик на клик по кнопке скрытия календаря
        document.getElementById("close-calendar-btn").addEventListener('click', (e)=> {
            this.hideCalendarWindow();
        })


    }

    showCalendarWindow(){
        this.calendarWindow.classList.remove('d-none');
    }

    hideCalendarWindow(){
        this.calendarWindow.classList.add('d-none');
    }

    // функция устанавливает на верстке название месяца и год
    setMonthString(){
        const string = `${currentDate.monthInfo[this.showedMonthNum].name} ${this.showedYear}`;
        this.monthName.textContent = string;
    }

    // функция переходит к следующему месяцу и меняет его название в строке
    forwardMonth(){
        if(this.showedMonthNum < 11){
            this.showedMonthNum++;
        } else{
            this.showedMonthNum = 0;
            this.showedYear++;
        }
    }

    // функция переходит к предыдущему месяцу
    backwardMonth(){
        if(this.showedMonthNum > 0){
            this.showedMonthNum--;
        } else {
            this.showedMonthNum = 11;
            this.showedYear--;
        }
    }

    // функция заполняет поле дней месяца 
    async fillMonthField(){
        // для начала надо понять какой день недели первое число месяца [0 - sun;]
        let firstDayDate = new Date(this.showedYear, this.showedMonthNum, 1);
        let numBufferDate = firstDayDate.getDay();

        // если выпало на воскресенье (0) - изменяем значение на 7 для удобства
        if(numBufferDate == 0){
            numBufferDate = 7;
        }

        // убираем тусклые дни
        this.returnAllDimDays(document.querySelector('.calendar-days'));
        
        // заполянем сначала от первого числа до конца
        this.__fillCalendarForward(firstDayDate, numBufferDate);

        // чекаем что первое число не выпало на понедельник
        if(numBufferDate != 1){
            // заполняем даты до первого числа
            this.__fillCalendarBackward(firstDayDate, numBufferDate);
        }
    }

    // функция заполняет календарь от первого числа и до конца ячеек
    __fillCalendarForward(firstDayDate, numBufferDate){
        let bufferDate = new Date(firstDayDate.getYear(), firstDayDate.getMonth(), firstDayDate.getDate());
        for(let i = numBufferDate; i<43; i++){
            document.querySelector(`[data-num="${i}"]`).textContent = bufferDate.getDate();
            // чекаем относится ли день к месяцу первого дня
            if(bufferDate.getMonth() != firstDayDate.getMonth()){
                document.querySelector(`[data-num="${i}"]`).classList.add('dim-day');
            }
            bufferDate.setDate(bufferDate.getDate() + 1);
        }
    }

    // функция заполняет календарь от первого числа до самого начала ячейки
    __fillCalendarBackward(firstDayDate, numBufferDate){
        let bufferDate = new Date(firstDayDate.getYear(), firstDayDate.getMonth(), firstDayDate.getDate()-1);
        for(let i = numBufferDate - 1; i > 0; i--){
            document.querySelector(`[data-num="${i}"]`).textContent = bufferDate.getDate();
            document.querySelector(`[data-num="${i}"]`).classList.add('dim-day');
            bufferDate.setDate(bufferDate.getDate() - 1);
        }
    }

    
    // функция убирает все тускло-выделенные дни
    returnAllDimDays(calendar){
        const arr = calendar.querySelectorAll('.dim-day');
        for(let i = 0; i<arr.length; i++){
            arr[i].classList.remove('dim-day');
        }
    }
    
    // функция-обработчик клика на день в календаре
    selectDayHandler(e){
        if(!e.target.classList.contains('dim-day')){
            this.hideCalendarWindow();
            // получили fulldate
            const selectFullDate = new Date(this.showedYear, this.showedMonthNum, e.target.textContent);
            // получаем nameDay
            const selectedNameDay = currentDate.weekInfo[selectFullDate.getDay()].name; 
            weekManager.changeSelectedWeek({fullDate: selectFullDate, nameDay: selectedNameDay});
        }
    }

    
}

const calendarWindow = new CalendarWindow("calendar-window");


export {calendarWindow};