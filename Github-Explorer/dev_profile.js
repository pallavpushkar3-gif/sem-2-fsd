function renderProfile(u) {
  document.getElementById("avatar").src = u.avatar_url;
  document.getElementById("profile-name").textContent = u.name || u.login;
  document.getElementById("profile-login").textContent = "@" + u.login;
  document.getElementById("profile-bio").textContent = u.bio || "";
  document.getElementById("st-repos").textContent = fmt(u.public_repos);
  document.getElementById("st-followers").textContent = fmt(u.followers);
  document.getElementById("st-following").textContent = fmt(u.following);

  const loc = document.getElementById("profile-location");
  loc.innerHTML = u.location
    ? `<i class="ti ti-map-pin"></i> ${u.location}`
    : "";
  loc.style.display = u.location ? "flex" : "none";

  const links = [];
  if (u.company)
    links.push(
      `<span class="profile-link"><i class="ti ti-building"></i>${u.company}</span>`,
    );
  if (u.blog)
    links.push(
      `<a class="profile-link" href="${u.blog}" target="_blank" rel="noopener"><i class="ti ti-link"></i>${u.blog.replace(/^https?:\/\//, "")}</a>`,
    );
  links.push(
    `<a class="profile-link" href="https://github.com/${u.login}" target="_blank" rel="noopener"><i class="ti ti-external-link"></i>View on GitHub</a>`,
  );
  document.getElementById("profile-links").innerHTML = links.join("");

  show("profile-card", "block");
}

// Total stars across all repos — GitHub's user API doesn't return this
// directly, so it's derived from allRepos once repos have loaded.
function updateStarsStat() {
  const total = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  document.getElementById("st-stars").textContent = fmt(total);
}

// ── Language breakdown chart ─────────────────────────────────────────
function renderLangChart(repos) {
  const map = {};
  repos.forEach((r) => {
    if (r.language) map[r.language] = (map[r.language] || 0) + 1;
  });

  const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
  const stackEl = document.getElementById("lang-stack");
  const legendEl = document.getElementById("lang-legend");

  if (!entries.length) {
    stackEl.innerHTML = "";
    legendEl.innerHTML =
      '<span style="color:#888780;font-size:12px">No language data yet.</span>';
    show("lang-card", "block");
    return;
  }

  const totalWithLang = repos.filter((r) => r.language).length;

  stackEl.innerHTML = entries
    .map(([lang, count]) => {
      const pct = (count / totalWithLang) * 100;
      const color = LANG_COLORS[lang] || LANG_COLORS.default;
      return `<div class="lang-seg" style="width:${pct}%;background:${color}" title="${lang} ${Math.round(pct)}%"></div>`;
    })
    .join("");

  legendEl.innerHTML = entries
    .map(([lang, count]) => {
      const pct = Math.round((count / totalWithLang) * 100);
      const color = LANG_COLORS[lang] || LANG_COLORS.default;
      return `
        <span class="lang-legend-item">
          <span class="lang-dot" style="background:${color}"></span>
          ${lang} <span class="lang-legend-pct">${pct}%</span>
        </span>`;
    })
    .join("");

  show("lang-card", "block");
}
