import service from '../services/taskService.js'



const controller = class {
    constructor(taskAddBtn, taskInput){
        this.taskService = new service();
        this.addBtn = taskAddBtn;
        this.input = taskInput;
    }

    addBtnHandler = () => {
        this.addBtn.addEventListener('click', () => {
            const userInput = taskInput.value.trim();
            try{
                this.taskService.create(userInput);
                this.input.value = '';
            }
            catch(error){
                this.#showInputError(error.message);
            }
            this.renderTasksSection()
        })
    }

    #createSvgIcon = () => {
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
    };

    #createCheckBox = taskObj => {
        const checkbox = document.createElement('div');
        if (taskObj.completed){
            checkbox.classList.add('task__checkbox', 'task__checkbox--active');
        }
        else{
            checkbox.classList.add('task__checkbox');
        }
        const svgIcon = this.#createSvgIcon();
        checkbox.appendChild(svgIcon);
        checkbox.addEventListener('click', () => {
            try{
                this.taskService.toggleStatus(taskObj);
            }
            catch(error){
                this.#showInputError(error.message)
            }
            this.renderTasksSection();
        });
        return checkbox;
    };


    #createTaskName = (taskName) => {
        const taskNameBlock = document.createElement('span');
        taskNameBlock.classList.add('task__name');
        taskNameBlock.textContent = taskName;
        return taskNameBlock;
    };

    #createCross = taskName => {
        const cross = document.createElement('img');
        cross.classList.add('task__delete-btn');
        cross.setAttribute('src', './img/delete-icon.svg');
        cross.addEventListener('click', () => {
            this.taskService.delete(taskName);
            this.renderTasksSection();
        });
        return cross;
    };

    #createTaskBlock = task => {
        const taskBlock = document.createElement('div');
        if (task.completed){
            taskBlock.classList.add('task', 'task--completed');
        }
        else{
            taskBlock.classList.add('task');
        }
        const checkBox = this.#createCheckBox(task);
        const taskName =  this.#createTaskName(task.name);
        const cross =  this.#createCross(task.name);
        taskBlock.append(checkBox, taskName, cross);
        return taskBlock;
    };

    #showInputError = (message) => {
        const taskInput = document.querySelector('.header__input')
        const errorSpan = document.querySelector('.error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        taskInput.style.borderColor = '#FF0000';
        taskInput.addEventListener('keyup', () => {
            errorSpan.removeAttribute('style');
            taskInput.removeAttribute('style');
        }, {"once": true});   
    };

    renderTasksSection = () => {
        const tasks = this.taskService.getList();
        const numOfCompletedTasksPerWeek = this.taskService.getNumOfCompletedTasksPerWeek(tasks);
        const taskBlocks = tasks.map((task) => this.#createTaskBlock(task));
        document.querySelector('.task-list').innerHTML = '';
        document.querySelector('.statistics-item__value--week').textContent = numOfCompletedTasksPerWeek;
        document.querySelector('.task-list').append(...taskBlocks);
    };
}

const taskAddBtn = document.querySelector('.header__add-btn')
const taskInput = document.querySelector('.header__input')
const taskController = new controller(taskAddBtn,taskInput);
taskController.addBtnHandler()
taskController.renderTasksSection()