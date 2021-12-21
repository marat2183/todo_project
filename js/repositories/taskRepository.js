const repository = class  {
    save = (tasksList) => localStorage.setItem('tasks', JSON.stringify(tasksList));

    getList = () => JSON.parse(localStorage.getItem('tasks')) || [];

    get = (taskName) => {
        const tasks = this.getList()
        const filteredList = tasks.filter(currentTask => currentTask.name === taskName)
        return filteredList ? filteredList[0]: undefined;
    };

    create = (task) => {
        task.lastModTime = Date.now()
        const tasks =  this.getList();
        this.save([...tasks, task]);
    };

    update = task => {
        const tasks =  this.getList();
        const changedTasksList = tasks.map(currentTask => {
            if (currentTask.name !== task.name) {
                return currentTask;
            }
            task.lastModTime = Date.now();
            return task
        });
        this.save(changedTasksList);
    }

    delete = (taskName) => {
        const tasksList =  this.getList();
        const changedTasksList = tasksList.filter(task => task.name !== taskName)
        this.save(changedTasksList)
    }



}


export default repository