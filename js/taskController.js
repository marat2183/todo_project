const addNewTask = name => {
    const date = new Date();
    const taskObj = {
        'name': name,
        'completed': false,
        'lastModTime': date.toLocaleString("ru")
    };
    const tasksList =  JSON.parse(localStorage.getItem("tasks")) || [];
    tasksList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    return;
}

const removeTask = name => {
    const tasksList =  JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasksList.length; i++){
        if (tasksList[i].name === name){
            tasksList.splice(i,1);
            break;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasksList))
    
}

const toggleTaskStatus = name => {
    const date = new Date();
    const tasksList =  JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasksList.length; i++){
        if (tasksList[i].name === name){
            if (tasksList[i].completed){
                tasksList[i].completed = false;
                tasksList[i].lastModTime = date.toLocaleString("ru");
                localStorage.setItem('tasks', JSON.stringify(tasksList));
                return;
            }
            tasksList[i].completed = true;
            tasksList[i].lastModTime = date.toLocaleString("ru");
            localStorage.setItem('tasks', JSON.stringify(tasksList));
            return;
        }
    }
}



const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks
}

// ==================================================================================


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

const createCheckBox = taskObj => {
    const checkbox = document.createElement('div');
    if (taskObj.completed){
        checkbox.classList.add('task__checkbox', 'task__checkbox--active');
    }
    else{
        checkbox.classList.add('task__checkbox');
    }
    const svgIcon = createSvgIcon();
    checkbox.appendChild(svgIcon);
    checkbox.addEventListener('click', () => {
        toggleTaskStatus(taskObj.name);
        renderTasks();
    });
    return checkbox;
}

const createTaskName = (taskName) => {
    const taskNameBlock = document.createElement('span');
    taskNameBlock.classList.add('task__name');
    taskNameBlock.textContent = taskName;
    return taskNameBlock;
}

const createCross = taskName => {
    const cross = document.createElement('img');
    cross.classList.add('task__delete-btn');
    cross.setAttribute('src', './img/delete-icon.svg');
    cross.addEventListener('click', () => {
        removeTask(taskName);
        renderTasks();
    });
    return cross;
}

const createTaskBlock = task => {
    const taskBlock = document.createElement('div');
    if (task.completed){
        taskBlock.classList.add('task', 'task--completed');
    }
    else{
        taskBlock.classList.add('task');
    }
    const checkBox = createCheckBox(task);
    const taskName = createTaskName(task.name);
    const cross = createCross(task.name);
    taskBlock.append(checkBox, taskName, cross);
    return taskBlock;
}

const showInputError = (message) => {
    const taskInput = document.querySelector('.header__input')
    const errorSpan = document.querySelector('.error');
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    taskInput.style.borderColor = '#FF0000';
    taskInput.addEventListener('keyup', () => {
        errorSpan.removeAttribute('style');
        taskInput.removeAttribute('style');
    }, {"once": true});   
}

const renderTasks = () => {
    const tasks = getTasks()
    const taskBlocks = tasks.map((task) => createTaskBlock(task))
    document.querySelector('.task-list').innerHTML = ''
    document.querySelector('.task-list').append(...taskBlocks)
}


export {renderTasks, addNewTask, getTasks, showInputError}