

// EDIT TASK
//    Replaces the card title with a text input
function startEdit(id) {
  var titleEl = document.getElementById("title-" + id);
  var currentTitle = titleEl.textContent;

  // Replace the title text with an input box
  titleEl.innerHTML =
    '<input class="card-edit-input" id="edit-input-' +
    id +
    '" value="' +
    currentTitle +
    '" />' +
    '<button onclick="saveEdit(' +
    id +
    ')">Save</button>';

  document.getElementById("edit-input-" + id).focus();
}

function saveEdit(id) {
  var newTitle = document.getElementById("edit-input-" + id).value.trim();

  if (newTitle === "") return; // Don't save empty titles

  // Find the task and update its title
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].title = newTitle;
      break;
    }
  }

  saveTasks();
  renderBoard();
}

function onDragStart(event, id) {
  draggingId = id;
  document.getElementById("card-" + id).classList.add("dragging");
}

// Called when dragging ends (whether dropped or cancelled)
function onDragEnd(event) {
  if (draggingId) {
    var card = document.getElementById("card-" + draggingId);
    if (card) card.classList.remove("dragging");
  }
}