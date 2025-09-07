// Firebase config (keep this secret if deployed)
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

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let optionButtons = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockOptions();
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
      showResult();
    }
  }, 3000);
}

function showResult() {
  questionContainer.style.display = "none";
  resultEl.style.display = "block";
  resultEl.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>`;
  updatePlayerCount();
}

function fetchPlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.once("value").then(snapshot => {
    const count = snapshot.val() || 0;
    document.getElementById("player-count").textContent = `Total players so far: ${count}`;
  }).catch(err => {
    console.error(err);
    document.getElementById("player-count").textContent = `Unable to load player count.`;
  });
}

function updatePlayerCount() {
  const countRef = database.ref("playerCount");
  countRef.transaction(current => {
    return (current || 0) + 1;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error("Transaction failed:", error);
    } else if (!committed) {
      console.warn("Transaction was not committed");
    } else {
      const updatedCount = snapshot.val();
      document.getElementById("player-count").textContent = `Total players so far: ${updatedCount}`;
  });
}

}

// Start
fetchPlayerCount();
showQuestion();

