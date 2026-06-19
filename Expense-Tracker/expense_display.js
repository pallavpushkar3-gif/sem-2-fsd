// ── Format currency ───────────────────────────────────────────────────
function fmt(n) {
  return (
    "₹" +
    n.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

// ── Render summary totals ─────────────────────────────────────────────
function renderSummary() {
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  document.getElementById("total-income").textContent = fmt(income);
  document.getElementById("total-expense").textContent = fmt(expense);

  const balEl = document.getElementById("total-balance");
  balEl.textContent = fmt(Math.abs(balance));
  balEl.className = "stat-value " + (balance >= 0 ? "income" : "negative");
}

// ── Render category bar chart ─────────────────────────────────────────
function renderChart() {
  const catMap = {};
  entries
    .filter((e) => e.type === "expense")
    .forEach((e) => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });

  const cats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const catEl = document.getElementById("cat-chart");

  if (cats.length === 0) {
    catEl.innerHTML =
      '<p style="font-size:13px;color:#888780">No expenses yet.</p>';
  } else {
    const max = cats[0][1];
    catEl.innerHTML = cats
      .map(
        ([cat, amt]) => `
          <div class="bar-wrap">
            <div class="bar-label">
              <span><i class="ti ${ICONS[cat] || "ti-dots"}"></i> ${cat}</span>
              <span>${fmt(amt)}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${Math.round((amt / max) * 100)}%"></div>
            </div>
          </div>
        `,
      )
      .join("");
  }
}
