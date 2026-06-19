// ── Constants
// Language colors (from github-colors)
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  R: "#198CE7",
  default: "#888780",
};

// ── Shared state
// The currently loaded repos for the searched user. Populated in
// dev-api.js, read by dev-profile.js and dev-repos.js.
let allRepos = [];

// ── Formatting helpers
// Format large numbers like GitHub does (1200 -> "1.2k")
function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

// Relative time, e.g. "3h ago" (kept for potential reuse / tooltips)
function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 60) return diff + "m ago";
  if (diff < 1440) return Math.floor(diff / 60) + "h ago";
  if (diff < 43200) return Math.floor(diff / 1440) + "d ago";
  return Math.floor(diff / 43200) + "mo ago";
}

// Absolute date, e.g. "2 Jun 2026"
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id, d) {
  document.getElementById(id).style.display = d || "";
}