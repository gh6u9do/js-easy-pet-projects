// для чего этот js файл?
// в этом файле мы получаем текущую дату, позволяем получать текущий год, месяц, день, название дня недели и месяца с помощью методов


const currentDate = {

  // описываем месяцы: ключ - номер месяца из класса date, значение - привычные номер и название
  monthInfo: {
    0: {
      num: 1,
      name: "January",
    },
    1: {
      num: 2,
      name: "February",
    },
    2: {
      num: 3,
      name: "March",
    },
    3: {
      num: 4,
      name: "April",
    },
    4: {
      num: 5,
      name: "May",
    },
    5: {
      num: 6,
      name: "June",
    },
    6: {
      num: 7,
      name: "July",
    },
    7: {
      num: 8,
      name: "Augest",
    },
    8: {
      num: 9,
      name: "September",
    },
    9: {
      num: 10,
      name: "October",
    },
    10: {
      num: 11,
      name: "November",
    },
    11: {
      num: 12,
      name: "December",
    }
  },



  // описываем дни недели: ключ - номер дня из класса date, значение - первые 3 буквы названия
  weekInfo: {
    0: {
      name: "sun"
    },
    1: {
      name: "mon"
    },
    2: {
      name: "tue"
    },
    3: {
      name: "wed"
    },
    4: {
      name: "thu"
    },
    5: {
      name: "fri"
    },
    6: {
      name: "sat"
    },
  },

  currentFullDate: new Date(),

  // инициализируем поля
  currentYear: null,
  currentMonth:null,
  currentNumOfWeekDay: null,
  currentNumDay: null,

}

// записываем текщий год, месяц, номер дня недели, число  
currentDate.currentYear = currentDate.currentFullDate.getFullYear();
currentDate.currentMonth = currentDate.currentFullDate.getMonth();
currentDate.currentNumOfWeekDay = currentDate.currentFullDate.getDay();
currentDate.currentNumDay = currentDate.currentFullDate.getDate();

// получаем текущий год
currentDate.getCurrentYear = function(){
  return this.currentYear;
}

// получаем текущий месяц
currentDate.getCurrentMonth = function(){
  return this.currentMonth;
}

// получаем число
currentDate.getCurrentNumDay = function(){
  return this.currentNumDay;
}

// получаем имя текущего дня
currentDate.getCurrentNameDay = function(){
  switch(this.currentNumOfWeekDay){
    case 0: {
      return "sun";
      break;
    };
    case 1: {
      return "mon";
      break;
    };
    case 2: {
      return "tue";
      break;
    };
    case 3: {
      return "wed";
      break;
    };
    case 4: {
      return "thu";
      break;
    };
    case 5: {
      return "fri";
      break;
    };
    case 6: {
      return "sat";
      break;
    };
  }

}


// получаем полную дату
currentDate.getFullCurrentDate = function(){
  return currentDate.currentFullDate;
}

// получаем назание текущего дня
currentDate.getNameCurrentDay = function(){
  return this.weekInfo[this.currentNumOfWeekDay].name;
}

currentDate.getCurrentDateObj = function(){
  return {
    fullDate: this.currentDate,
    year: this.currentYear,
    month: this.getCurrentMonth(),
    numOfWeek: this.currentNumOfWeekDay,
    numDay: this.currentNumDay,
    nameDay: this.getNameCurrentDay(),
  }
}

currentDate.setActualDataInToDoSection = function(){
  // находим currentDate и устанавливаем туда актуальное число
  const currentDateBlock = document.getElementById("current-date");
  currentDateBlock.textContent = currentDate.getCurrentNumDay();

  // находим currentMonth и устанавливаем туда актуальный месяц
  const currentMonthBlock = document.getElementById("current-month");
  currentMonthBlock.textContent = currentDate.monthInfo[this.currentMonth].num;

  // находим currentYear и устанавливаем туда актуальный год
  const currentYearBlock = document.getElementById("current-year");
  currentYearBlock.textContent = currentDate.getCurrentYear();
}

export { currentDate };
