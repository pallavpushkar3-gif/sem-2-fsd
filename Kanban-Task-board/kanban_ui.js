// 8. DRAG AND DROP (over/leave/drop)

// Called when a card is dragged over a column — allows dropping
function onDragOver(event) {
  event.preventDefault(); // IMPORTANT: without this, drop won't fire
  event.currentTarget.classList.add("drag-over");
}

// Called when the card leaves a column area
function onDragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

// Called when a card is dropped into a column
function onDrop(event, targetColumn) {
  event.currentTarget.classList.remove("drag-over");

  if (draggingId === null) return;

  // Find the task and update its column
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === draggingId) {
      tasks[i].column = targetColumn;
      break;
    }
  }

  draggingId = null;
  saveTasks();
  renderBoard();
}

// 9. UPDATE COUNTS
//    Shows how many cards are in each column
function updateCounts() {
  var todoCount = 0;
  var inprogressCount = 0;
  var doneCount = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].column === "todo") todoCount++;
    if (tasks[i].column === "inprogress") inprogressCount++;
    if (tasks[i].column === "done") doneCount++;
  }

  document.getElementById("count-todo").textContent = todoCount;
  document.getElementById("count-inprogress").textContent = inprogressCount;
  document.getElementById("count-done").textContent = doneCount;
}

// 10. DARK MODE TOGGLE
function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById("theme-btn");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    btn.textContent = "🌙 Dark Mode";
    localStorage.setItem("kanban-theme", "light");
  } else {
    body.classList.add("dark");
    btn.textContent = "☀️ Light Mode";
    localStorage.setItem("kanban-theme", "dark");
  }
}

function loadTheme() {
  var saved = localStorage.getItem("kanban-theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-btn").textContent = "☀️ Light Mode";
  }
}

// 11. START EVERYTHING
loadTheme();
loadTasks();
renderBoard();
