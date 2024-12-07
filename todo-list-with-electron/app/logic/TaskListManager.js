// для чего этот js класс? 
// в этом классе описываются методы, для работы со списком задач

class TasksListManager{

    constructor(container){
        this.container = container;
    }

    // ренумеровать таски
    renumTasks(){
        // получаем массив со всеми блоками тасок
        const tasksArray = Array.from(this.container.children);

        // перебираем каждую таску и меняем номер равный индексу +1
        tasksArray.forEach((taskBlock, index) => {
            taskBlock.querySelector('.num-task').textContent = `#${index + 1}`;
        });
    }

    // ренумеровать начиная с заданного индекса
    renumFromIndex(index){
        // получаем массив со всеми блоками тасок
        const tasksArray = Array.from(this.container.children);

        for(let i = index; i < tasksArray.length; i++){
            tasksArray[i].querySelector('.num-task').textContent = `#${index + 1}`;
            index++;
        }
    }

    // добавить элемент в список
    addElement(template){
        this.container.appendChild(template);
    }

    // удаляет элемент из списка и возвращает индекс, на котором элемент находился
    removeElement(id){
        // находим индекс
        const tasksArray = Array.from(this.container.children);
        const indexDeletedElem = tasksArray.findIndex((elem) => elem.dataset.id == id);

        this.container.querySelector(`[data-id="${id}"]`).remove();

        return indexDeletedElem;
    }

    // чекнуть лист на пустоту
    checkListOnEmpty(){
        if(this.container.children.length > 0){
            return false;
        } else {
            return true;
        }
    }

    // скрыть таскс лист
    hideTasksListBlock(){
        this.container.classList.add('d-none');
    }

}

export { TasksListManager };