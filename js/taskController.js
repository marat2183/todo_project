const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks
}

const saveTasks = (tasksList) => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

const addNewTask = name => {
    const taskObj = {
        'name': name,
        'completed': false,
        'lastModTime': Date.now()
    };
    const tasksList =  getTasks();
    tasksList.push(taskObj);
    saveTasks(tasksList);
    return;
}

const removeTask = name => {
    const tasksList =  getTasks();
    const changedTasksList = tasksList.filter(task => task.name !== name)
    saveTasks(changedTasksList)
}

const toggleTaskStatus = name => {
    const tasksList =  getTasks();
    tasksList.some(taskObj => {
        if (taskObj.name === name) {
            taskObj.completed = !taskObj.completed;
            taskObj.lastModTime = Date.now();
            return true
        }
    });
    saveTasks(tasksList);
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
        renderTasksSection();
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
        renderTasksSection();
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

const renderTasksSection = () => {
    const tasks = getTasks();
    const numOfCompletedTasksPerWeek = getNumOfCompletedTasksPerWeek(tasks);
    const taskBlocks = tasks.map((task) => createTaskBlock(task));
    document.querySelector('.task-list').innerHTML = '';
    document.querySelector('.statistics-item__value--week').textContent = numOfCompletedTasksPerWeek;
    document.querySelector('.task-list').append(...taskBlocks);
}


export {renderTasksSection, addNewTask, getTasks, showInputError}