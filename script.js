let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(i);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question-container").style.display = "none";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";
  resultEl.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>`;
}

nextBtn.addEventListener("click", showQuestion);

// Start quiz
showQuestion();
