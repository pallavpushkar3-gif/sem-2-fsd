// ── Add or update an entry ────────────────────────────────────────────
function submitEntry() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  // Basic validation
  if (!desc || !amount || amount <= 0 || !date) {
    alert("Please fill in all fields with a valid amount.");
    return;
  }

  if (editId !== null) {
    // UPDATE existing entry
    const idx = entries.findIndex((e) => e.id === editId);
    if (idx > -1) {
      entries[idx] = {
        id: editId,
        desc,
        amount,
        category,
        date,
        type: currentType,
      };
    }
    editId = null;
    document.getElementById("form-title").textContent = "Add transaction";
    document.getElementById("submit-btn").innerHTML =
      '<i class="ti ti-plus"></i> Add entry';
  } else {
    // CREATE new entry — add to the front of the array
    entries.unshift({
      id: Date.now(),
      desc,
      amount,
      category,
      date,
      type: currentType,
    });
  }

  save();

  // Reset form
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").valueAsDate = new Date();
  setType("expense");

  render();
}

// ── Delete an entry ───────────────────────────────────────────────────
function deleteEntry(id) {
  if (!confirm("Delete this transaction?")) return;
  entries = entries.filter((e) => e.id !== id); // filter out the deleted one
  save();
  render();
}

// ── Load entry into form for editing ──────────────────────────────────
function editEntry(id) {
  const e = entries.find((x) => x.id === id);
  if (!e) return;

  document.getElementById("desc").value = e.desc;
  document.getElementById("amount").value = e.amount;
  document.getElementById("category").value = e.category;
  document.getElementById("date").value = e.date;
  setType(e.type);

  editId = id;
  document.getElementById("form-title").textContent = "Edit transaction";
  document.getElementById("submit-btn").innerHTML =
    '<i class="ti ti-check"></i> Save changes';
  window.scrollTo({ top: 0, behavior: "smooth" });
}