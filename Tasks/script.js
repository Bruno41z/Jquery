$(document).ready(function () {
    displayTasks();
});

function addTask() {
    let taskTitleInput = $('#taskTitleInput');
    let taskDescriptionInput = $('#taskDescriptionInput');
    let timeInput = $('#timeInput');
    let taskTitle = taskTitleInput.val();
    let taskDescription = taskDescriptionInput.val();
    let taskTime = parseInt(timeInput.val()) || 10;

    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
        let taskList = $('#taskList');
        let remainingTime = taskTime * 60;

        let newTask = $(`
            <li>
                <span class="taskTitle">${taskTitle}</span>
                <span class="description">${taskDescription}</span>
                <span class="close" onclick="removeTask(this)">×</span>
                <span class="edit" onclick="editTask(this)">✎</span>
                <span class="timer">${formatTime(remainingTime)}</span>
            </li>
        `);
        taskList.append(newTask);

        taskTitleInput.val('');
        taskDescriptionInput.val('');
        timeInput.val('');

        startTimer(newTask.find('.timer'), remainingTime);
        saveTasks();
    }
}

function removeTask(element) {
    $(element).parent().remove();
    saveTasks();
}

function editTask(element) {
    let taskItem = $(element).parent();
    let taskTitle = taskItem.find('.taskTitle');
    let taskDescription = taskItem.find('.description');
    let newTitleInput = $('<input type="text">').val(taskTitle.text());
    let newDescriptionInput = $('<textarea></textarea>').val(taskDescription.text());
    
    taskTitle.replaceWith(newTitleInput);
    taskDescription.replaceWith(newDescriptionInput);

    newTitleInput.focus();

    newTitleInput.blur(function () {
        let newTitle = newTitleInput.val().trim();
        let newDescription = newDescriptionInput.val().trim();
        
        if (newTitle !== '' && newDescription !== '') {
            taskTitle.text(newTitle);
            taskDescription.text(newDescription);
            saveTasks();
        } else {
            taskItem.remove();
            saveTasks();
        }
    });

    newTitleInput.keypress(function (e) {
        if (e.which === 13) {
            newTitleInput.blur();
        }
    });
}

function displayTasks() {
    let taskList = $('#taskList');
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(function (task) {
        let newTask = $(`
            <li>
                <span class="taskTitle">${task.title}</span>
                <span class="description">${task.description}</span>
                <span class="close" onclick="removeTask(this)">×</span>
                <span class="edit" onclick="editTask(this)">✎</span>
                <span class="timer">${formatTime(task.remainingTime)}</span>
            </li>
        `);
        taskList.append(newTask);

        if (task.remainingTime > 0) {
            startTimer(newTask.find('.timer'), task.remainingTime);
        } else {
            newTask.find('.timer').text('Czas minął');
        }
    });
}

function saveTasks() {
    let taskArray = [];
    $('#taskList li').each(function () {
        let taskTitle = $(this).find('.taskTitle').text();
        let taskDescription = $(this).find('.description').text();
        let remainingTime = parseInt($(this).find('.timer').attr('data-remaining-time')) || 0;
        taskArray.push({ title: taskTitle, description: taskDescription, remainingTime: remainingTime });
    });

    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function startTimer(timerElement, remainingTime) {
    function updateTimer() {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerElement.text(formattedTime).attr('data-remaining-time', remainingTime);

        if (remainingTime > 0) {
            remainingTime--;
            setTimeout(updateTimer, 1000);
        } else {
            timerElement.text('Czas minął');
        }
    }

    updateTimer();
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
