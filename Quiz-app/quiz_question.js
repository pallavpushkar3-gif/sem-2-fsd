// ── Render a question ─────────────────────────────────────────────────
function renderQuestion() {
  locked = false;
  const q = questions[idx];
  const total = questions.length;
  const pct = Math.round((idx / total) * 100);

  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("q-num").textContent =
    "Question " + (idx + 1) + " of " + total;
  document.getElementById("q-score").textContent = "Score: " + score;
  document.getElementById("question").textContent = q.q;

  const letters = ["A", "B", "C", "D"];
  document.getElementById("options").innerHTML = q.options
    .map(
      (o, i) => `
    <div class="opt" id="opt-${i}" onclick="choose(${i})">
      <span class="opt-letter">${letters[i]}</span>
      <span>${o}</span>
    </div>
  `,
    )
    .join("");

  // Reset feedback + next button
  const fb = document.getElementById("feedback");
  fb.className = "feedback";
  fb.textContent = "";
  document.getElementById("next-btn").className = "next-btn";
}

// ── Handle answer choice ──────────────────────────────────────────────
function choose(i) {
  if (locked) return;
  locked = true;

  const q = questions[idx];
  const opts = document.querySelectorAll(".opt");
  opts.forEach((o) => o.classList.add("locked"));

  const fb = document.getElementById("feedback");

  if (i === q.answer) {
    score++;
    opts[i].classList.add("correct");
    fb.textContent = "Correct";
    fb.className = "feedback correct show";
  } else {
    wrong++;
    opts[i].classList.add("wrong");
    opts[q.answer].classList.add("correct");
    fb.textContent = "Wrong";
    fb.className = "feedback wrong show";
  }

  document.getElementById("q-score").textContent = "Score: " + score;
  document.getElementById("next-btn").className = "next-btn show";
}

// ── Next question or show result ──────────────────────────────────────
function nextQuestion() {
  idx++;
  if (idx >= questions.length) {
    showResult();
    return;
  }
  renderQuestion();
}
