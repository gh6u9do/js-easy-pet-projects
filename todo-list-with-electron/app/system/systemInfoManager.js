// для чего этот файл? 
// в этом файле хранится логика для взаимодействия с system json
const fs = require('fs');
const path = require('path');

const systemInfoManager = {

    pathToFile: path.join(path.resolve(), 'app', 'system', 'info.json'),

    setUserName(name){
        // читаем json file 
        const file = fs.readFileSync(this.pathToFile);
        const obj = JSON.parse(file);
        obj.userName = name;
        obj.isLogined = true;
        fs.writeFileSync(this.pathToFile, JSON.stringify(obj));
    },

    getUserName(){
        // читаем json file 
        const file = fs.readFileSync(this.pathToFile);
        const obj = JSON.parse(file);
        return obj.userName;
    },

    getLoginStatus(){
        // читаем json file 
        const file = fs.readFileSync(this.pathToFile);
        const obj = JSON.parse(file);
        return obj.isLogined;
    }, 

    logOutUser(){

        // читаем jsonFile
        const file = fs.readFileSync(this.pathToFile);
        const obj = JSON.parse(file);
        obj.userName = "";
        obj.isLogined = false;
        fs.writeFileSync(this.pathToFile, JSON.stringify(obj));
    }


}

export {systemInfoManager};