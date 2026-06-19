// ── Screens ───────────────────────────────────────────────────────────
function show(id) {
  ["screen-topic", "screen-quiz", "screen-result"].forEach((s) => {
    document.getElementById(s).style.display = s === id ? "" : "none";
  });
}

function goHome() {
  show("screen-topic");
}

// ── Build topic grid ──────────────────────────────────────────────────
function buildTopics() {
  document.getElementById("topic-grid").innerHTML = Object.entries(TOPICS)
    .map(
      ([name, t]) => `
      <div class="topic-card" onclick="startQuiz('${name}')">
        <i class="ti ${t.icon}"></i>
        <span>${name}</span>
        <small>10 questions</small>
      </div>
    `,
    )
    .join("");
}

// ── Start quiz ────────────────────────────────────────────────────────
function startQuiz(topic) {
  currentTopic = topic;
  // Shuffle a copy of the questions
  questions = [...TOPICS[topic].questions].sort(() => Math.random() - 0.5);
  idx = 0;
  score = 0;
  wrong = 0;
  locked = false;
  show("screen-quiz");
  renderQuestion();
}

function retryTopic() {
  startQuiz(currentTopic);
}

// ── Initialize on page load ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  buildTopics();
});
