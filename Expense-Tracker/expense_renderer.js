function renderTransactions() {
  const filtered =
    currentFilter === "all"
      ? entries
      : entries.filter((e) => e.type === currentFilter);

  document.getElementById("tx-count").textContent =
    filtered.length + " transaction" + (filtered.length !== 1 ? "s" : "");

  const list = document.getElementById("tx-list");

  if (filtered.length === 0) {
    list.innerHTML = `
          <div class="empty">
            <i class="ti ti-receipt-off" style="font-size:28px;display:block;margin-bottom:8px"></i>
            No transactions yet. Add one above.
          </div>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (e) => `
        <div class="tx">
          <div class="tx-icon ${e.type}">
            <i class="ti ${ICONS[e.category] || "ti-dots"}"></i>
          </div>
          <div class="tx-info">
            <div class="tx-desc">${e.desc}</div>
            <div class="tx-meta">
              ${e.category} · ${new Date(
                e.date + "T00:00:00",
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div class="tx-amount ${e.type}">
            ${e.type === "income" ? "+" : "-"}${fmt(e.amount)}
          </div>
          <div class="tx-actions">
            <button class="icon-btn" onclick="editEntry(${e.id})" aria-label="Edit">
              <i class="ti ti-edit" style="font-size:16px"></i>
            </button>
            <button class="icon-btn" onclick="deleteEntry(${e.id})" aria-label="Delete">
              <i class="ti ti-trash" style="font-size:16px"></i>
            </button>
          </div>
        </div>
      `,
    )
    .join("");
}

// ── Master render — calls all three display functions ─────────────────
function render() {
  renderSummary();
  renderChart();
  renderTransactions();
}