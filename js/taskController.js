const taskListBlock = document.querySelector('.task-list')


const updateItemOnLocalStorage = (task) => {
    const date = new Date();
    const taskName = task.querySelector('.task__name').textContent;
    const taskData = JSON.parse(localStorage.getItem(taskName));
    if (task.classList.contains('task--completed')){
        taskData.status.completed = true;
        taskData.status.time = date.toLocaleString("ru");
        localStorage.setItem(taskName, JSON.stringify(taskData));
        return
    }
    taskData.status.completed = false;
    taskData.status.time = date.toLocaleString("ru");
    localStorage.setItem(taskName, JSON.stringify(taskData));
    return
    
}

const addDeleteListenerForBtn = (task) => {
    const taskDeleteBtn = task.querySelector('.task__delete-btn')
    taskDeleteBtn.addEventListener('click', function(){
        const task = this.closest('.task');
        const taskName = task.querySelector('.task__name').textContent;
        task.remove();
        localStorage.removeItem(taskName)
    });
}

const addCheckboxListener = (task) => {
    const checkbox = task.querySelector('.task__checkbox')
    checkbox.addEventListener('click', function(){
        checkbox.classList.toggle('task__checkbox--active');
        const task = this.parentElement
        task.classList.toggle('task--completed')
        updateItemOnLocalStorage(task)
    });
}

const createTaskNameSpan = (taskNameValue) => {
    const taskNameSpan = document.createElement('span')
    taskNameSpan.classList.add('task__name')
    taskNameSpan.textContent = taskNameValue
    return taskNameSpan
}

const createTaskDeleteIcon = () => {
    const taskDeleteBtn = document.createElement('img')
    taskDeleteBtn.classList.add('task__delete-btn')
    taskDeleteBtn.setAttribute('src', './img/delete-icon.svg')
    return taskDeleteBtn
}


const createSvgIcon = () => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.classList.add('task__checkbox-icon');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('width', '20');
    iconSvg.setAttribute('height', '20');
    iconSvg.setAttribute('x', '0px');
    iconSvg.setAttribute('y', '0px')
    iconPath.setAttribute(
        'd',
        `M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 
         L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 
         L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 
         L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z`
    );
    iconSvg.append(iconPath);
    return iconSvg
    
}
const createTaskCheckboxBlock = (completed) => {
    const taskCheckboxBlock = document.createElement('div');
    if (completed){
        taskCheckboxBlock.classList.add('task__checkbox', 'task__checkbox--active');
    }
    else{
        taskCheckboxBlock.classList.add('task__checkbox');
    }
    const svgIcon = createSvgIcon();
    taskCheckboxBlock.appendChild(svgIcon);
    return taskCheckboxBlock
}

const createTaskBlock = (taskObj) => {
    const task = document.createElement('div');
    if (taskObj.status.completed){
        task.classList.add('task', 'task--completed');
    }
    else{
        task.classList.add('task');
    }
    const taskCheckBoxBlock = createTaskCheckboxBlock(taskObj.status.completed);
    const taskSpan = createTaskNameSpan(taskObj.name);
    const taskDeleteBtn = createTaskDeleteIcon();
    task.append(taskCheckBoxBlock, taskSpan, taskDeleteBtn);
    return task
}

const addDataToList = (taskObj) => {
    const task = createTaskBlock(taskObj);
    taskListBlock.appendChild(task);
    addDeleteListenerForBtn(task);
    addCheckboxListener(task)
    return task
}

export {
            addDataToList,
            updateItemOnLocalStorage,
            addCheckboxListener,
            addDeleteListenerForBtn
        }