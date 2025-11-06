const LIVE_SCORE_API = 'https://api.example.com/cricket/live'; // replace with actual cricket API
const SCORECARD_API = 'https://api.example.com/cricket/scorecard'; // replace with actual cricket API

function fetchLiveScore() {
  fetch(LIVE_SCORE_API)
    .then(res => res.json())
    .then(data => renderLiveScore(data))
    .catch(err => {
      document.getElementById('score-container').textContent = 'Failed to load live score';
    });
}

function fetchScorecard() {
  fetch(SCORECARD_API)
    .then(res => res.json())
    .then(data => renderScorecard(data))
    .catch(err => {
      document.getElementById('scorecard-container').textContent = 'Failed to load scorecard';
    });
}

function renderLiveScore(data) {
  // Example: update this as per actual data structure
  const scoreHTML = `
    <div><strong>${data.teamA}</strong>: ${data.scoreA}/${data.wicketsA} (${data.oversA} ov)</div>
    <div><strong>${data.teamB}</strong>: ${data.scoreB}/${data.wicketsB} (${data.oversB} ov)</div>
    <div>${data.status}</div>
  `;
  document.getElementById('score-container').innerHTML = scoreHTML;
}

function renderScorecard(data) {
  // Example: update this as per actual data structure
  let batsmen = data.batsmen
    .map(p => `<div>${p.name}: ${p.runs} (${p.balls} balls)</div>`)
    .join('');
  let bowlers = data.bowlers
    .map(p => `<div>${p.name}: ${p.overs} overs, ${p.runs} runs, ${p.wickets} wickets</div>`)
    .join('');
  document.getElementById('scorecard-container').innerHTML = `<h3>Batsmen</h3>${batsmen}<h3>Bowlers</h3>${bowlers}`;
}

// Auto-refresh every 30 seconds
setInterval(() => {
  fetchLiveScore();
  fetchScorecard();
}, 30000);

// Initial load
fetchLiveScore();
fetchScorecard();