// для чего этот js файл? 
// в этом файле описыватся визуальное поведение элементов, которые делаются с помощью js 


// увеличение высоты textarea таски
const taskContainer = document.getElementById('tasks-container');
taskContainer.addEventListener('input', (e) => {
    
    // чекакем что инпут именно в textArea
    if(e.target.tagName === "TEXTAREA"){

        // обнуляем высоту чтобы поле уменьшалось, если текст уменьшится
        e.target.style.height = '';

        // устанавливаем высоту +2px на бордер
        e.target.style.height = `${e.target.scrollHeight + 2}px`
    }

})

