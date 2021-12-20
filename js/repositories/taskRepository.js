const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks
}

const saveTasks = (tasksList) => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

const createTask = (taskName) => {
    const taskObj = {
        'name': taskName,
        'completed': false,
        'lastModTime': Date.now()
    };
    const tasksList =  getTasks();
    tasksList.push(taskObj);
    saveTasks(tasksList);
}

const updateTask = taskName => {
    const tasksList =  getTasks();
    const changedTasksList = tasksList.map(taskObj => {
        if (taskObj.name === taskName) {
            taskObj.completed = !taskObj.completed;
            taskObj.lastModTime = Date.now();
            return taskObj;
        }
        return taskObj;
    });
    saveTasks(changedTasksList);
}

const deleteTask = (taskName) => {
    const tasksList =  getTasks();
    const changedTasksList = tasksList.filter(task => task.name !== taskName)
    saveTasks(changedTasksList)
}

const repository = {
    getTasks,
    saveTasks,
    deleteTask,
    createTask,
    updateTask
}


export default repository