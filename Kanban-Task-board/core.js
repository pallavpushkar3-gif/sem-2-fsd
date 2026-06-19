// 1. THE DATA — all tasks are stored here
//    Each task has: id, title, column
var tasks = [];

// This keeps track of which card is being dragged
var draggingId = null;

// 2. SAVE & LOAD from localStorage
//    So tasks survive a page refresh
function saveTasks() {
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var saved = localStorage.getItem("kanban-tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// 3. RENDER — clears the board and redraws
//    all cards from the tasks array
function renderBoard() {
  // Clear all three columns
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  // Loop through tasks and put each in the right column
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var cardHTML = buildCardHTML(task);
    document.getElementById(task.column).innerHTML += cardHTML;
  }

  // Update the count badges
  updateCounts();
}

// 4. BUILD CARD HTML
//    Takes a task object, returns HTML string
function buildCardHTML(task) {
  var html = "";
  html += '<div class="card" id="card-' + task.id + '" draggable="true"';
  html += ' ondragstart="onDragStart(event, ' + task.id + ')"';
  html += ' ondragend="onDragEnd(event)">';

  html +=
    '<div class="card-title" id="title-' +
    task.id +
    '">' +
    task.title +
    "</div>";

  html += '<div class="card-actions">';

  // Show "Start" button only on To Do cards
  if (task.column === "todo") {
    html += '<button class="btn-start" onclick="moveTask(' + task.id + ', \'inprogress\')"> Start</button>';
  }

  // Show "Done" button only on In Progress cards
  if (task.column === "inprogress") {
    html += '<button class="btn-done" onclick="moveTask(' + task.id + ', \'done\')">✅ Done</button>';
  }

  html += '<button onclick="startEdit(' + task.id + ')">Edit</button>';
  html +=
    '<button class="btn-delete" onclick="deleteTask(' +
    task.id +
    ')">Delete</button>';
  html += "</div>";

  html += "</div>";
  return html;
}