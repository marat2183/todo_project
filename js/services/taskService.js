import repository from '../repositories/taskRepository.js'

const service = class  {
    constructor (){
        this.taskRepository = new repository;
    }

    getList = () => this.taskRepository.getList();

    get = (taskName) => this.taskRepository.get(taskName);

    create = (userInput, completed = false) => {
        if (!userInput){
            throw new Error ('Your task name is empty!')
        }
        const task = this.get(userInput)
        if (task){
            throw new Error ('Task with such name already in your task list!')
        }
        const newTask = {
            name: userInput,
            completed,
        }
        this.taskRepository.create(newTask);
    }

    toggleStatus = (taskObj) => {
        const task = this.get(taskObj.name);
        if (!task){
            throw new Error ('Task doesn\'t exist')
        }
        taskObj.completed = !taskObj.completed
        this.taskRepository.update(taskObj);
    }
    
    delete = (taskName) => this.taskRepository.delete(taskName);

    getNumOfCompletedTasksPerWeek = tasks => {
        const currentDateUTC = Date.now();
        const weekOnUTC = 604800000;
        const filteredTasks = tasks.filter(task => {
           if (task.completed && task.lastModTime > (currentDateUTC - weekOnUTC)){
               return true;
           }
        });
        return filteredTasks.length;
    }
}

const taskService = new service()


export default service