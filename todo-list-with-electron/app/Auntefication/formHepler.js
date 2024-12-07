// Для чего этот js объект?
// он включает в себя универсальные функции, которые нужны для работы с формами

import { mongoDatabase } from "../db/mongoDatabase.js";

let formHepler = {
  isEmptyInput(input) {
    // как работает эта функция?
    //если инпут ничего не содержит или там только пробелы, то функция вернет true

    if (input.value == "" || input.value.trim() == "") {
      console.log();
      return true;
    } else {
      return false;
    }
  },

  async isExistInDb(value, collection) {
    // получаем коллекцию
    const array = await mongoDatabase.getCollection(collection);

    // чекаем существование такого значения в коллекции
    const result = array.find((obj) => obj.login === value);
    console.log("результат поиска имени в бд: " + result);
    if (result == undefined) {
      return false;
    } else {
      return true;
    }
  },

  selectInput(input) {
    input.focus();
    input.style.borderColor = "var(--red-color)";

    setTimeout(() => {
      input.style.borderColor = "var(--dim-gray)";
    }, 2000);
  },

  isCorrectLengthInput(input, length) {
    if (input.value.length < length) {
      return false;
    } else {
      return true;
    }
  },

  isCorrectConfirmInput(input, confirmInput) {
    if (input.value === confirmInput.value) {
      return true;
    } else {
      return false;
    }
  },

  createUserObjectForDb(inputLogin, inputPassword) {
    const obj = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    return obj;
  },

  async isMatchLoginData(query){
    const result =  await mongoDatabase.findOne('users', query);
    if(result != undefined){
      return true;
    } else{
      return false;
    }
    
  },
};

export { formHepler };
