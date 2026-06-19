// Category icons
const ICONS = {
  Food: "ti-bowl-chopsticks",
  Transport: "ti-bus",
  Shopping: "ti-shopping-bag",
  Bills: "ti-file-invoice",
  Health: "ti-heart-rate-monitor",
  Salary: "ti-building-bank",
  Freelance: "ti-briefcase",
  Other: "ti-dots",
};

// Load data from localStorage (or start with empty array)
let entries = JSON.parse(localStorage.getItem("et_entries") || "[]");
let currentType = "expense";
let currentFilter = "all";
let editId = null;

// Set today's date as default
document.getElementById("date").valueAsDate = new Date();

// ── Save to localStorage ──────────────────────────────────────────────
function save() {
  localStorage.setItem("et_entries", JSON.stringify(entries));
}

// ── Toggle income / expense ───────────────────────────────────────────
function setType(type) {
  currentType = type;
  document.getElementById("btn-expense").className =
    "type-btn" + (type === "expense" ? " active expense" : "");
  document.getElementById("btn-income").className =
    "type-btn" + (type === "income" ? " active income" : "");
}

// ── Toggle filter ─────────────────────────────────────────────────────
function setFilter(filter, el) {
  currentFilter = filter;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  render();
}