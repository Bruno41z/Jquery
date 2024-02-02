$(document).ready(function () {
    displayTasks();
});

function addTask() {
    let taskInput = $('#taskInput');
    let taskText = taskInput.val();

    if (taskText.trim() !== '') {
        let taskList = $('#taskList');
        let newTask = $('<li><span class="taskText">' + taskText + '</span><span class="close" onclick="removeTask(this)">×</span><span class="edit" onclick="editTask(this)">✎</span></li>');
        taskList.append(newTask);

        taskInput.val('');

        saveTasks();
    }
}

function removeTask(element) {
    $(element).parent().remove();
    saveTasks();
}

function editTask(element) {
    let taskText = $(element).siblings('.taskText').text();
    let newText = prompt('Edytuj zadanie:', taskText);

    if (newText !== null && newText.trim() !== '') {
        $(element).siblings('.taskText').text(newText);
        saveTasks();
    }
}

function displayTasks() {
    let taskList = $('#taskList');
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(function (taskText) {
        let newTask = $('<li><span class="taskText">' + taskText + '</span><span class="close" onclick="removeTask(this)">×</span><span class="edit" onclick="editTask(this)">✎</span></li>');
        taskList.append(newTask);
    });
}

function saveTasks() {
    let taskTexts = [];
    $('#taskList .taskText').each(function () {
        taskTexts.push($(this).text());
    });

    localStorage.setItem('tasks', JSON.stringify(taskTexts));
}
