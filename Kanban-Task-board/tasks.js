function addTask() {
  var input = document.getElementById("task-input");
  var select = document.getElementById("column-select");
  var errorMsg = document.getElementById("add-error");

  var title = input.value.trim();

  // Validate
  if (title === "") {
    errorMsg.classList.add("show");
    return;
  }

  errorMsg.classList.remove("show");

  // Create new task object
  var newTask = {
    id: Date.now(), // unique number based on timestamp
    title: title,
    column: select.value,
  };

  tasks.push(newTask);
  saveTasks();
  renderBoard();

  // Clear the input
  input.value = "";
  input.focus();
}

// Allow pressing Enter to add a task
document
  .getElementById("task-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

// 6. DELETE TASK
//    Removes a task from the array by its id
function deleteTask(id) {
  // Filter out the task with this id
  var newTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;

  saveTasks();
  renderBoard();
}

// 6b. MOVE TASK
//     Moves a task to a target column (used by Start / Done buttons)
function moveTask(id, targetColumn) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].column = targetColumn;
      break;
    }
  }
  saveTasks();
  renderBoard();
}