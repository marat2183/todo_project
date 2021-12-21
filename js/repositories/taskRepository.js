
const save = (tasksList) => localStorage.setItem('tasks', JSON.stringify(tasksList));

const create = (task) => {
    task.lastModTime = Date.now()
    const tasks =  getList();
    save([...tasks, task]);
}

const getList = () => JSON.parse(localStorage.getItem('tasks')) || [];


const get = (taskName) => {
    const tasks = getList()
    const filteredList = tasks.filter(currentTask => currentTask.name === taskName)
    return filteredList ? filteredList[0]: undefined; 
}

const update = task => {
    const tasks =  getList();
    const changedTasksList = tasks.map(currentTask => {
        if (currentTask.name !== task.name) {
            return currentTask;
        }
        task.lastModTime = Date.now();
        return task
    });
    save(changedTasksList);
}

const _delete = (taskName) => {
    const tasksList =  getList();
    const changedTasksList = tasksList.filter(task => task.name !== taskName)
    save(changedTasksList)
}

const repository = {
    create,
    getList,
    get,
    update,
    delete: _delete,
}


export default repository