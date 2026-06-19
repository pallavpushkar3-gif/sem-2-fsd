// ── Rate limit pill ───────────────────────────────────────────────────
// ── Rate limit pill ───────────────────────────────────────────────────
async function updateRateLimit() {
  try {
    const res = await fetch("https://api.github.com/rate_limit");
    if (!res.ok) return;
    const data = await res.json();
    const core = data.resources.core;
    const mins = Math.max(0, Math.round((core.reset * 1000 - Date.now()) / 60000));
    const pill = document.getElementById("rate-pill");
    document.getElementById("rate-text").innerHTML =
      `API: <strong>${core.remaining}/${core.limit}</strong> (resets in ${mins}m)`;
    pill.classList.toggle("warn", core.remaining < core.limit * 0.2);
    pill.style.display = "flex";
  } catch (err) {
    // silently ignore — not critical to core functionality
  }
}

// ── Search ────────────────────────────────────────────────────────────
let allRepos = [];

async function search() {
  const user = document.getElementById("username").value.trim();
  if (!user) return;

  // Reset UI
  hide("profile-card");
  hide("lang-card");
  hide("repos-section");
  hide("error-box");
  hide("rate-warn");
  show("loading-profile", "block");

  try {
    // Fetch profile and repos in parallel
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}`),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`,
      ),
    ]);

    updateRateLimit();

    hide("loading-profile");

    if (uRes.status === 403 || rRes.status === 403) {
      show("rate-warn", "flex");
      return;
    }

    if (!uRes.ok) {
      document.getElementById("error-msg").textContent =
        uRes.status === 404
          ? `User "${user}" not found.`
          : "GitHub API error: " + uRes.status;
      show("error-box", "block");
      return;
    }

    const u = await uRes.json();
    const repos = rRes.ok ? await rRes.json() : [];

    renderProfile(u);
    allRepos = Array.isArray(repos) ? repos : [];

    const repoSearch = document.getElementById("repo-search");
    const repoLangFilter = document.getElementById("repo-lang-filter");
    const repoSort = document.getElementById("repo-sort");
    if (repoSearch) repoSearch.value = "";
    if (repoLangFilter) repoLangFilter.value = "";
    if (repoSort) repoSort.value = "updated";

    populateLangFilter();
    renderRepos();
    renderLangChart(allRepos);
    updateStarsStat();
  } catch (err) {
    hide("loading-profile");
    document.getElementById("error-msg").textContent =
      "Network error. Check your connection.";
    show("error-box", "block");
  }
}

// ── Init ─────────────────────────────────────────────────────────────
updateRateLimit();
