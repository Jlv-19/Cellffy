<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MCQ Quiz</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="quiz-container">
    <h1>MCQ Quiz</h1>
    <div id="question-container">
      <p id="question"></p>
      <ul id="options"></ul>
    </div>
    <button id="next-btn">Next</button>
    <div id="result" style="display: none;"></div>
  </div>
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: "HTML"
  },
  {
    question: "Which is the largest planet in our Solar System?",
    options: ["Earth", "Saturn", "Jupiter", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax"
    ],
    answer: "Cascading Style Sheets"
  }
];

  <script src="questions.js"></script>
  <script src="script.js"></script>
</body>
</html>

