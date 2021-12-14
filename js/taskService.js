import { addDataToList } from './taskController.js';


const taskAddBtn = document.querySelector('.header__add-btn')
const taskInput = document.querySelector('.header__input')



const showInputError = () => {
    const errorSpan = document.querySelector('.error');
    errorSpan.style.display = 'block';
    taskInput.style.borderColor = '#FF0000'
    setInterval(() =>{
        errorSpan.removeAttribute('style');
        taskInput.removeAttribute('style');
    }, 5000)
}

for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let taskData = localStorage.getItem(key)
    try{
        let temp = JSON.parse(taskData)
        if (temp.name){
            addDataToList(temp)
        }
    } catch{
        continue
    }
}


taskAddBtn.addEventListener('click', function(event){
    const date = new Date();
    const taskObj = {
        'name': taskInput.value,
        'status': {
            'completed': false,
            'time': date.toLocaleString("ru")
        }
    }
    console.log(taskObj);
    if (localStorage.getItem(taskObj.name)){
        console.log('cond')
        showInputError()
    }
    else{
        addDataToList(taskObj)
        localStorage.setItem(taskObj.name, JSON.stringify(taskObj))
        taskInput.value = '';
    }
});





