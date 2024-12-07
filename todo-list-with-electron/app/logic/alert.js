// для чего этот js класс? 
// в этом классе описывается поведение всплывающих алертов

import { sectionManager } from "../system/sectionManager.js";

const alert = {

    // записываем блок контейнер в this
    alertBlock: document.getElementById('alert-block'),

    // показывается ли алерт сейчас?

    async show(content){

        this.alertBlock.textContent = "";
        this.alertBlock.textContent = content;
        this.alertBlock.style.top = "2rem";
        sectionManager.showSection('cover');

        await setTimeout(()=>this.hide() , 2000);
    

    },

    hide(){
        this.alertBlock.style.top = "-100px";
        sectionManager.hideSection('cover');
    }

}


export {alert}