// THEME TOGGLE
function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark");
}

// UPDATE TOGGLE TEXT
function updateModeText(toggle) {
    let text = document.getElementById("modeText");
    if (!text) return;

    text.innerText = toggle.checked ? "Light Mode" : "Dark Mode";
}

// SET INITIAL MODE TEXT
function setInitialModeText() {
    let text = document.getElementById("modeText");
    let toggle = document.querySelector(".toggle-switch input");

    if (!text || !toggle) return;

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        text.innerText = "Light Mode";
        toggle.checked = true;
    } else {
        text.innerText = "Dark Mode";
    }
}

// TODO
function addTask() {
    let input = document.getElementById("taskInput");
    if (!input || input.value === "") return;

    let li = document.createElement("li");
    li.innerText = input.value;

    li.onclick = function () {
        li.style.textDecoration = "line-through";
        saveTasks();
        updateTaskCount();
    };

    document.getElementById("taskList").appendChild(li);
    input.value = "";
    saveTasks();
}

function saveTasks() {
    let list = document.getElementById("taskList");
    if (list)
        localStorage.setItem("tasks", list.innerHTML);
}

function loadTasks() {
    let list = document.getElementById("taskList");
    if (list)
        list.innerHTML = localStorage.getItem("tasks") || "";
}

// COUNT COMPLETED TASKS
function updateTaskCount() {
    let tasks = document.querySelectorAll("#taskList li");
    let completed = 0;

    tasks.forEach(task => {
        if (task.style.textDecoration === "line-through") {
            completed++;
        }
    });

    localStorage.setItem("completedTasks", completed);
    loadProgress();
}

// TIMER
let time = 1500;
let interval;

function startTimer() {
    let display = document.getElementById("timer");
    if (!display) return;

    interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);

            let sessions = localStorage.getItem("sessions") || 0;
            sessions++;
            localStorage.setItem("sessions", sessions);

            alert("Session complete!");
            loadProgress();
            return;
        }

        time--;
        let m = Math.floor(time / 60);
        let s = time % 60;

        display.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    time = 1500;
    let display = document.getElementById("timer");
    if (display) display.innerText = "25:00";
}

// NOTES
function saveNote() {
    let note = document.getElementById("noteInput");
    if (!note) return;

    localStorage.setItem("note", note.value);
    document.getElementById("savedNote").innerText = note.value;
}

function loadNote() {
    let saved = localStorage.getItem("note") || "";
    let display = document.getElementById("savedNote");
    if (display) display.innerText = saved;
}

// LOAD PROGRESS
function loadProgress() {
    let t = localStorage.getItem("completedTasks") || 0;
    let s = localStorage.getItem("sessions") || 0;

    let taskEl = document.getElementById("taskCount");
    let sessionEl = document.getElementById("sessionCount");

    if (taskEl) taskEl.innerText = t;
    if (sessionEl) sessionEl.innerText = s;
}

// ON LOAD
window.onload = function () {
    setInitialModeText();
    loadTasks();
    loadNote();
    loadProgress();
};