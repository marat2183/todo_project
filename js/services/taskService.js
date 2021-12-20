import taskRepository from '../repositories/taskRepository.js'


const getTasks = () => {
    const tasks = taskRepository.getTasks();
    return tasks;
}

const addTask = (userInput) => {
    const tasks = getTasks();
    const filteredList = tasks.filter(task => task.name === userInput);
    if (!userInput){
        throw new Error ('Your task name is empty!')
    }
    else if (filteredList.length > 0){
        throw new Error ('Task with such name already in your task list!')
    }
    taskRepository.createTask(userInput);
}

const toggleTaskStatus = (taskName) => {
    taskRepository.updateTask(taskName);
}

const removeTask = (taskName) => {
    taskRepository.deleteTask(taskName);
}


const getNumOfCompletedTasksPerWeek = tasks =>{
    const currentDateUTC = Date.now();
    const weekOnUTC = 604800000;
    const filteredTasks = tasks.filter(task => {
       if (task.completed && task.lastModTime > (currentDateUTC - weekOnUTC)){
           return true;
       }
    });
    return filteredTasks.length;
}

const service = {
    addTask,
    toggleTaskStatus,
    removeTask,
    getTasks,
    getNumOfCompletedTasksPerWeek
}


export default service