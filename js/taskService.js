import { renderTasksSection, addNewTask, getTasksFromLocalStorage, showInputError } from "./taskController.js"

const taskAddBtn = document.querySelector('.header__add-btn')
const taskInput = document.querySelector('.header__input')



renderTasksSection();

taskAddBtn.addEventListener('click', () => {
    const tasks = getTasksFromLocalStorage();
    const userInput = taskInput.value.trim();
    const filteredList = tasks.filter(task => task.name === userInput);
    if (!userInput){
        showInputError('Your task name is empty!');
    }
    else if (filteredList.length > 0){
        showInputError('Task with such name already in your task list!');
    }
    else{
        addNewTask(userInput);
        renderTasksSection();
        taskInput.value = '';
    }
})