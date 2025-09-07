let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let optionButtons = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const questionContainer = document.getElementById("question-container");

// Timer display
const timerEl = document.createElement("p");
timerEl.id = "timer";
questionContainer.prepend(timerEl);

// ✅ Fetch player count on load
fetchGlobalPlayerCount();

// ✅ Start the quiz
showQuestion();

// 🔁 Auto-advance after delay
function autoNextQuestion() {
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 3000); // 3-second delay after answer or timeout
}

// 🕒 Start countdown for each question
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

// 📄 Display a question and its options
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
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
    btn.onclick = () => checkAnswer(i, btn);
    li.appendChild(btn);
    optionsEl.appendChild(li);
    optionButtons.push(btn);
  });
}

// ✅ Check selected answer and show correct one
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
  autoNextQuestion(); // 👈 move to next automatically
}

// 🔒 Disable all buttons
function lockOptions() {
  optionButtons.forEach(btn => btn.disabled = true);
}

// 🏁 Final result screen
function showResult() {
  clearInterval(timer);
  questionContainer.style.display = "none";
  resultEl.style.display = "block";

  resultEl.innerHTML = `
    <h2>You scored ${score} out of ${questions.length}</h2>
    <p id="player-count">Updating total players...</p>
  `;

  updateGlobalPlayerCount();
}

// 🔢 Get current total player count
function fetchGlobalPlayerCount() {
  const countRef = firebase.database().ref('playerCount');
  countRef.once('value')
    .then(snapshot => {
      const count = snapshot.val() || 0;
      document.getElementById('player-count').textContent = `Total players so far: ${count}`;
    })
    .catch(err => {
      console.error("Failed to fetch player count:", err);
      document.getElementById('player-count').textContent = `Unable to load player count`;
    });
}

// 🔼 Increment global player count after quiz ends
function updateGlobalPlayerCount() {
  const countRef = firebase.database().ref('playerCount');

  countRef.transaction(current => (current || 0) + 1)
    .then(() => countRef.once('value'))
    .then(snapshot => {
      const count = snapshot.val();
      document.getElementById('player-count').textContent = `Total players so far: ${count}`;
    })
    .catch(err => console.error("Failed to update player count:", err));
}
