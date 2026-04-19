// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "Who was the commander in the crew?",
    answers: [
      { text: "Victor Glover", correct: false },
      { text: "Reid Wiseman", correct: true },
      { text: "Jeremy Hansen", correct: false },
      { text: "Christina Koch", correct: false },
    ],
  },
  {
    question: "What was Christina Koch's role?",
    answers: [
      { text: "Mission Specialist", correct: true },
      { text: "Pilot", correct: false },
      { text: "Commander", correct: false },
      { text: "Biohazard", correct: false },
    ],
  },
  {
    question: "How many daughters does Victor Glover have?",
    answers: [
      { text: "One", correct: false },
      { text: "Two", correct: false },
      { text: "Three", correct: false },
      { text: "Four", correct: true },
    ],
  },
  {
    question: "Jeremy Hansen was the first ___ to ever venture to the moon.",
    answers: [
      { text: "Vegan", correct: false },
      { text: "Basketball player", correct: false },
      { text: "Canadian", correct: true },
      { text: "inmate", correct: false },
    ],
  },
  {
    question: "When did Artemis II launch?",
    answers: [
      { text: "April 10, 2026", correct: false },
      { text: "April 1, 2026", correct: true },
      { text: "March 30, 2026", correct: true },
      { text: "April 5, 2026", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// event listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"
    // 50%

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
    
      // dataset is a property of the button element lets you store custom data
      button.dataset.correct = answer.correct;

      button.addEventListener("click", selectAnswer);

      answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if(answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";


  Array.from(answersContainer.children).forEach((button) => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  },1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100

  if(percentage === 100) {
    resultMessage.textContent = "Amazing! You are the #1 Artemis II fan!";
  } else if (percentage >= 80) {
      resultMessage.textContent = "Great! Almost every question was correct.";
  } else if (percentage >= 60) {
      resultMessage.textContent = "Good effort. More than half of the answers were correct.";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Most are incorrect..."
  } else {
    resultMessage.textContent = "Maybe next time.";
  }
}


function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}