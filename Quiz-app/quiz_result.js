function showResult() {
  show('screen-result');

  const total = questions.length;
  const pct   = Math.round((score / total) * 100);

  document.getElementById('final-pct').textContent  = pct + '%';
  document.getElementById('final-frac').textContent = score + ' / ' + total;
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent   = wrong;
  document.getElementById('stat-total').textContent   = total;

  // Animate ring (circumference of r=50 circle = 314)
  const circ   = 2 * Math.PI * 50;
  const offset = circ - (pct / 100) * circ;
  const ring   = document.getElementById('ring-arc');
  ring.style.strokeDashoffset = offset;
  ring.style.stroke =
    pct >= 80 ? '#3b6d11' :
    pct >= 50 ? '#854f0b' : '#a32d2d';

  // Message based on score
  const [, msg, detail] =
    pct >= 80 ? [80, 'Excellent work!',  'You really know your stuff.'] :
    pct >= 50 ? [50, 'Good effort!',      'A bit more practice and you\'ll nail it.'] :
                [0,  'Keep going!',        'Every wrong answer is a learning moment.'];

  document.getElementById('result-msg').textContent    = msg;
  document.getElementById('result-detail').textContent = detail;
}