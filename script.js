
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


addTaskButton.addEventListener('click', addTask);


renderTasks();