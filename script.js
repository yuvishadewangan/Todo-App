const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const themeBtn = document.getElementById("themeBtn");

loadTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    saveTasks();
    updateStats();
}

taskList.addEventListener("click", function (e) {

    if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("completed");

        saveTasks();
        updateStats();
    }

    if (e.target.classList.contains("delete-btn")) {

        e.target.parentElement.remove();

        saveTasks();
        updateStats();
    }
});

clearBtn.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {

        taskList.innerHTML = "";

        saveTasks();
        updateStats();
    }
});

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {

    taskList.innerHTML = localStorage.getItem("tasks") || "";

    updateStats();
}

function updateStats() {

    const total = document.querySelectorAll("#taskList li").length;

    const completed = document.querySelectorAll(
        "#taskList .completed"
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}