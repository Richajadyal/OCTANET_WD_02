let taskList = [];

// render task list
function renderTaskList() {
    const taskListHTML = taskList.map((task, index) => {
        return `
            <li data-index="${index}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    }).join('');
    document.getElementById('task-list').innerHTML = taskListHTML;
}

// add new task
document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTaskText = document.getElementById('new-task').value.trim();
    if (newTaskText) {
        taskList.push({ text: newTaskText, completed: false });
        document.getElementById('new-task').value = '';
        renderTaskList();
    }
});

// mark task as completed
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        const taskIndex = e.target.parentNode.dataset.index;
        taskList[taskIndex].completed = e.target.checked;
        renderTaskList();
    }
});

// edit task
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const taskIndex = e.target.parentNode.dataset.index;
        const taskText = prompt('Edit task:', taskList[taskIndex].text);
        if (taskText) {
            taskList[taskIndex].text = taskText;
            renderTaskList();
        }
    }
});

// delete task
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskIndex = e.target.parentNode.dataset.index;
        taskList.splice(taskIndex, 1);
        renderTaskList();
    }
});

// initial render
renderTaskList();