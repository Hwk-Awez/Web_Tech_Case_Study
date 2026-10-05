const questions = [
  // Easy

  {
    word: "Happy",
    options: ["Joyful", "Sad", "Excited", "Cheerful"],
    answer: "Sad",
  },

  {
    word: "Big",
    options: ["Large", "Huge", "Small", "Wide"],
    answer: "Small",
  },

  {
    word: "Fast",
    options: ["Quick", "Rapid", "Slow", "Swift"],
    answer: "Slow",
  },

  {
    word: "Hot",
    options: ["Warm", "Cold", "Boiling", "Burning"],
    answer: "Cold",
  },

  {
    word: "Easy",
    options: ["Simple", "Difficult", "Clear", "Light"],
    answer: "Difficult",
  },

  {
    word: "Early",
    options: ["Soon", "Late", "Quick", "Fast"],
    answer: "Late",
  },

  {
    word: "Strong",
    options: ["Powerful", "Weak", "Healthy", "Hard"],
    answer: "Weak",
  },

  {
    word: "Beautiful",
    options: ["Pretty", "Lovely", "Ugly", "Attractive"],
    answer: "Ugly",
  },

  {
    word: "Clean",
    options: ["Neat", "Dirty", "Fresh", "Pure"],
    answer: "Dirty",
  },

  {
    word: "Young",
    options: ["Small", "Old", "New", "Fresh"],
    answer: "Old",
  },
];

let currentQuestion = 0;
let score = 0;

let selectedAnswer = null;
let answered = false;

const wordElement = document.getElementById("word");
const optionsElement = document.getElementById("options");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("questionNumber");

const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

// Shuffle questions randomly
function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

// Load question
function loadQuestion() {
  const question = questions[currentQuestion];

  wordElement.textContent = question.word;

  questionNumberElement.textContent = currentQuestion + 1;

  optionsElement.innerHTML = "";

  selectedAnswer = null;

  answered = false;

  messageElement.textContent = "";

  question.options.forEach(function (option) {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option");

    button.addEventListener("click", function () {
      if (answered) {
        return;
      }

      document.querySelectorAll(".option").forEach(function (btn) {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      selectedAnswer = option;
    });

    optionsElement.appendChild(button);
  });
}

// Submit answer
submitBtn.addEventListener("click", function () {
  if (answered) {
    return;
  }

  if (selectedAnswer === null) {
    messageElement.textContent = "Please select an option.";
    return;
  }

  answered = true;

  const question = questions[currentQuestion];

  const buttons = document.querySelectorAll(".option");

  buttons.forEach(function (button) {
    if (button.textContent === question.answer) {
      button.classList.add("correct");
    }

    if (
      button.textContent === selectedAnswer &&
      selectedAnswer !== question.answer
    ) {
      button.classList.add("wrong");
    }
  });

  if (selectedAnswer === question.answer) {
    score++;

    scoreElement.textContent = score;

    messageElement.textContent = "Correct! 🎉";
  } else {
    messageElement.textContent =
      "Wrong! The correct answer is " + question.answer + ".";
  }
});

// Next question
nextBtn.addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;

    loadQuestion();
  } else {
    messageElement.textContent =
      "Game completed! Your score is " + score + " / " + questions.length;

    nextBtn.disabled = true;
  }
});

// Restart game
restartBtn.addEventListener("click", function () {
  currentQuestion = 0;

  score = 0;

  scoreElement.textContent = score;

  nextBtn.disabled = false;

  // Shuffle questions again
  shuffleQuestions();

  loadQuestion();
});

// Shuffle questions when the game starts
shuffleQuestions();

loadQuestion();
