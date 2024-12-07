// для чего этот js файл?
// в этом файле содержится логика loader

const loader = {

    "loader-block": document.getElementById('loader-block'),
    "loader": document.getElementById('loader'), 

    showLoader(){
        this["loader-block"].classList.remove('d-none');
    }, 

    removeLoader(){
        setTimeout(()=>{
            this["loader-block"].classList.add('d-none');
        }, 200);
    }
}

export {loader}