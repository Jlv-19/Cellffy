// ✅ Firebase Config
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

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");
const playerInputArea = document.getElementById("playerInputArea");
const leaderboardArea = document.getElementById("leaderboardArea");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let totalTime = 0;
let optionButtons = [];

// ✅ Start Quiz when page loads
window.onload = () => {
  fetchPlayerCount();
  showQuestion();
};

// ================= Functions ===================

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockOptions();
      totalTime += 30;
      autoNextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  optionButtons = [];

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(i, btn);
    li.appendChild(btn);
    optionsEl.appendChild(li);
    optionButtons.push(btn);
  });
}

function checkAnswer(selectedIndex, selectedBtn) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
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
  }, 1000);
}

function showNameInput() {
  questionContainer.style.display = "none";
  playerInputArea.style.display = "block";
  document.getElementById("submitScoreBtn").onclick = submitScore;
}

function submitScore() {
  const playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  const finalScore = score * 1000 - totalTime;
  const playerId = "player_" + Math.random().toString(36).substring(2, 10);

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
}

function showLeaderboard(currentPlayerName, currentPlayerScore) {
  leaderboardArea.style.display = "block";

  firebase.database().ref("players").once("value").then(snapshot => {
    if (!snapshot.exists()) {
      leaderboardArea.innerHTML = "<p>No players yet!</p>";
      return;
    }

    const players = Object.values(snapshot.val());
    players.sort((a, b) => b.finalScore - a.finalScore || a.totalTimeTaken - b.totalTimeTaken);
    players.forEach((p, i) => p.rank = i + 1);

    const current = players.find(p => p.name === currentPlayerName && p.finalScore === currentPlayerScore);

    let html = `
      <h2>Your Results</h2>
      ${current ? `<p><strong>${current.name}</strong>, you ranked <strong>#${current.rank}</strong>!</p>
      <p>Correct: ${current.correctAnswers} | Time: ${current.totalTimeTaken}s | Final Score: ${current.finalScore}</p>` : ""}
      <h2>Top 10 Players</h2>
      <table>
        <tr><th>Rank</th><th>Name</th><th>Correct</th><th>Time (s)</th></tr>
    `;

    players.slice(0, 10).forEach(p => {
      const highlight = (current && p.name === current.name && p.finalScore === current.finalScore)
        ? "class='highlight'" : "";
      html += `
        <tr ${highlight}>
          <td>${p.rank}</td>
          <td>${p.name}</td>
          <td>${p.correctAnswers}</td>
          <td>${p.totalTimeTaken}</td>
        </tr>`;
    });

    html += "</table>";
    leaderboardArea.innerHTML = html;
    updatePlayerCount();
  });
}

// ✅ Firebase Player Count Tracking
function fetchPlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.once("value").then(snapshot => {
    const count = snapshot.val() || 0;
    document.getElementById("player-count").textContent = `Total players so far: ${count}`;
  });
}

function updatePlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.transaction(current => (current || 0) + 1, (error, committed, snapshot) => {
    if (!error && committed) {
      document.getElementById("player-count").textContent =
        `Total players so far: ${snapshot.val()}`;
    }
  });
}
