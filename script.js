// ✅ Firebase config (keep this safe)
const firebaseConfig = {
  apiKey: "AIzaSyCVWweySpXBryYXkIB_ICmp_qvipj4Zi40",
  authDomain: "cellffy-live-tracker.firebaseapp.com",
  databaseURL: "https://cellffy-live-tracker-default-rtdb.firebaseio.com",
  projectId: "cellffy-live-tracker",
  storageBucket: "cellffy-live-tracker.appspot.com",
  messagingSenderId: "998082281935",
  appId: "1:998082281935:web:cc9c96d98a16ec386292ba",
  measurementId: "G-T6L3B9WVV6"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");

// --- Leaderboard input area (dynamically created)
const playerInputArea = document.createElement("div");
playerInputArea.id = "playerInputArea";
playerInputArea.style = "display:none; text-align:center; margin-top:20px;";
playerInputArea.innerHTML = `
  <input type="text" id="playerName" placeholder="Enter your name" style="padding:8px; font-size:16px;" />
  <button id="submitScoreBtn" style="padding:8px 12px; font-size:16px;">Submit Score</button>
`;
document.body.appendChild(playerInputArea);

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let optionButtons = [];
let totalTime = 0; // to track total time across questions

// ✅ Start the quiz
fetchPlayerCount();
showQuestion();

// ================= Functions ===================

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  const start = Date.now();

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockOptions();
      totalTime += 30; // add full 30s if timeout
      autoNextQuestion();
    }
  }, 1000);

  return start;
}

function showQuestion() {
  clearInterval(timer);

  const questionStartTime = startTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  optionButtons = [];

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(i, btn, questionStartTime);
    li.appendChild(btn);
    optionsEl.appendChild(li);
    optionButtons.push(btn);
  });
}

function checkAnswer(selectedIndex, selectedBtn, questionStartTime) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;

  // Track time spent for this question
  const timeSpent = 30 - timeLeft;
  totalTime += timeSpent;

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    optionButtons[correctIndex].classList.add("correct");
  }

  lockOptions();
  autoNextQuestion();
}

function lockOptions() {
  optionButtons.forEach(btn => btn.disabled = true);
}

function autoNextQuestion() {
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showNameInput();
    }
  }, 1000); // shorter delay for faster quiz
}

// --- Show input for player name at the end ---
function showNameInput() {
  questionContainer.style.display = "none";
  playerInputArea.style.display = "block";

  const submitBtn = document.getElementById("submitScoreBtn");
  submitBtn.onclick = () => {
    const playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
      alert("Please enter your name!");
      return;
    }

    const finalScore = score * 1000 - totalTime;
    const playerId = generateID();

    // Save to Firebase
    firebase.database().ref("players/" + playerId).set({
      name: playerName,
      correctAnswers: score,
      totalTimeTaken: totalTime,
      finalScore,
      timestamp: Date.now()
    }).then(() => {
      playerInputArea.style.display = "none";
      showLeaderboard(playerName, finalScore);
    });
  };
}

// --- Generate unique player ID ---
function generateID() {
  return "player_" + Math.random().toString(36).substring(2, 10);
}

// --- Show leaderboard ---
function showLeaderboard(currentPlayerName, currentPlayerScore) {
  firebase.database().ref("players").once("value").then((snapshot) => {
    if (!snapshot.exists()) {
      alert("No players yet!");
      return;
    }

    const players = Object.values(snapshot.val());

    // Sort by score descending, tie-breaker by time
    players.sort((a, b) => b.finalScore - a.finalScore || a.totalTimeTaken - b.totalTimeTaken);

    // Assign rank
    players.forEach((p, i) => p.rank = i + 1);

    // Find current player
    const current = players.find(p => p.name === currentPlayerName && p.finalScore === currentPlayerScore);

    // Build leaderboard HTML
    let html = `
      <h2>Your Results</h2>
      ${current ? `<p><strong>${current.name}</strong>, you ranked <strong>#${current.rank}</strong>!</p>
      <p>Correct: ${current.correctAnswers} | Time: ${current.totalTimeTaken}s | Final Score: ${current.finalScore}</p>` : ""}
      <h2>Top 10 Players</h2>
      <table style="margin:auto; border-collapse:collapse; text-align:center;">
        <tr style="background:#eee;"><th>Rank</th><th>Name</th><th>Correct</th><th>Time (s)</th></tr>
    `;

    players.slice(0, 10).forEach(p => {
      const highlight = (current && p.name === current.name && p.finalScore === current.finalScore) ? "background-color:#d1ffd1;font-weight:bold;" : "";
      html += `
        <tr style="border:1px solid #ccc; ${highlight}">
          <td>${p.rank}</td>
          <td>${p.name}</td>
          <td>${p.correctAnswers}</td>
          <td>${p.totalTimeTaken}</td>
        </tr>
      `;
    });
    html += `</table>`;

    // Insert leaderboard into page
    const leaderboardDiv = document.createElement("div");
    leaderboardDiv.id = "leaderboardArea";
    leaderboardDiv.innerHTML = html;
    document.body.appendChild(leaderboardDiv);
  });
}

// --- Existing player count functions ---
function fetchPlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.once("value")
    .then(snapshot => {
      const count = snapshot.val() || 0;
      document.getElementById("player-count").textContent = `Total players so far: ${count}`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("player-count").textContent = `Unable to load player count.`;
    });
}

function updatePlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.transaction(current => (current || 0) + 1,
    (error, committed, snapshot) => {
      if (error) console.error("Transaction failed:", error);
      else if (!committed) console.warn("Transaction not committed.");
      else document.getElementById("player-count").textContent = `Total players so far: ${snapshot.val()}`;
    });
}

