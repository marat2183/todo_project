import taskRepository from '../repositories/taskRepository.js'

const getList = () => taskRepository.getList();

const get = (taskName) => taskRepository.get(taskName);

const create = (userInput, completed = false) => {
    if (!userInput){
        throw new Error ('Your task name is empty!')
    }
    const task = get(userInput)
    if (task){
        throw new Error ('Task with such name already in your task list!')
    }
    const newTask = {
        name: userInput,
        completed,
    }
    taskRepository.create(newTask);
}

const toggleStatus = (taskObj) => {
    const task = get(taskObj.name);
    if (!task){
        throw new Error ('Task doesn\'t exist')
    }
    taskObj.completed = !taskObj.completed
    taskRepository.update(taskObj);
}

const _delete = (taskName) => taskRepository.delete(taskName);

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
    create,
    getList,
    toggleStatus,
    delete: _delete,
    getNumOfCompletedTasksPerWeek
}


export default service