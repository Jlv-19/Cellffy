let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let optionButtons = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const questionContainer = document.getElementById("question-container");

// Create timer element
const timerEl = document.createElement("p");
timerEl.id = "timer";
questionContainer.prepend(timerEl);

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockOptions();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  startTimer();

  nextBtn.style.display = "none";
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
  nextBtn.style.display = "block";
}

function lockOptions() {
  optionButtons.forEach(btn => btn.disabled = true);
}

function showResult() {
  clearInterval(timer);
  questionContainer.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";
  resultEl.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>`;
}

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

// Start quiz
showQuestion();
fetchGlobalPlayerCount(); // 👈 This will show count on load


