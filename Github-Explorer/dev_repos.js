function populateLangFilter() {
  const sel = document.getElementById("repo-lang-filter");
  const langs = [...new Set(allRepos.map((r) => r.language).filter(Boolean))].sort();
  sel.innerHTML =
    '<option value="">All Languages</option>' +
    langs.map((l) => `<option value="${l}">${l}</option>`).join("");
}

function filterRepos() {
  renderRepos();
}

function renderRepos() {
  const q = (document.getElementById("repo-search")?.value || "")
    .trim()
    .toLowerCase();
  const langFilter = document.getElementById("repo-lang-filter")?.value || "";
  const sortBy = document.getElementById("repo-sort")?.value || "updated";

  let list = allRepos.filter((r) => {
    const matchesQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q));
    const matchesLang = !langFilter || r.language === langFilter;
    return matchesQuery && matchesLang;
  });

  list = list.sort((a, b) => {
    if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
    if (sortBy === "forks") return b.forks_count - a.forks_count;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(b.pushed_at) - new Date(a.pushed_at); // updated
  });

  document.getElementById("repo-count").textContent =
    list.length + " repositor" + (list.length === 1 ? "y" : "ies");

  show("repos-section", "block");

  const container = document.getElementById("repos-list");

  if (list.length === 0) {
    container.innerHTML =
      '<div class="empty" style="grid-column:1/-1"><i class="ti ti-folder-off" style="font-size:26px;display:block;margin-bottom:8px"></i>No repositories match.</div>';
    return;
  }

  container.innerHTML = list
    .map(
      (r) => `
        <div class="repo">
          <div class="repo-top">
            <div class="repo-name">
              <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0">
              <span class="visibility-badge">${r.private ? "Private" : "Public"}</span>
              ${r.fork ? '<span class="fork-badge">fork</span>' : ""}
            </div>
          </div>
          ${r.description ? `<div class="repo-desc">${r.description}</div>` : '<div style="height:4px"></div>'}
          <div class="repo-bottom">
            ${
              r.language
                ? `
              <span class="repo-stat">
                <span class="lang-dot" style="background:${LANG_COLORS[r.language] || LANG_COLORS.default}"></span>
                ${r.language}
              </span>`
                : ""
            }
            <span class="repo-stat"><i class="ti ti-star"></i>${fmt(r.stargazers_count)}</span>
            <span class="repo-stat"><i class="ti ti-git-fork"></i>${fmt(r.forks_count)}</span>
            <span class="repo-stat"><i class="ti ti-eye"></i>${fmt(r.watchers_count)}</span>
            <span class="repo-stat"><i class="ti ti-box"></i>${fmt(r.size)} KB</span>
            <span class="repo-stat"><i class="ti ti-clock"></i>${formatDate(r.pushed_at)}</span>
          </div>
        </div>`
    )
    .join("");
}