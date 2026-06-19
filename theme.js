function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById("theme-btn");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    btn.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    btn.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme when page opens
function loadTheme() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-btn").textContent = "Light Mode";
  }
}