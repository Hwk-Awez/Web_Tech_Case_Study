const questions = [
  // Easy
  {
    word: "Happy",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: "Joyful",
  },

  {
    word: "Big",
    options: ["Large", "Small", "Short", "Thin"],
    answer: "Large",
  },

  {
    word: "Fast",
    options: ["Slow", "Quick", "Weak", "Late"],
    answer: "Quick",
  },

  {
    word: "Smart",
    options: ["Clever", "Lazy", "Weak", "Slow"],
    answer: "Clever",
  },

  {
    word: "Small",
    options: ["Huge", "Tiny", "Heavy", "Wide"],
    answer: "Tiny",
  },

  {
    word: "Begin",
    options: ["End", "Start", "Stop", "Finish"],
    answer: "Start",
  },

  {
    word: "Easy",
    options: ["Difficult", "Simple", "Hard", "Complex"],
    answer: "Simple",
  },

  {
    word: "Angry",
    options: ["Furious", "Calm", "Happy", "Quiet"],
    answer: "Furious",
  },

  {
    word: "Beautiful",
    options: ["Ugly", "Pretty", "Bad", "Weak"],
    answer: "Pretty",
  },

  {
    word: "Help",
    options: ["Assist", "Ignore", "Stop", "Leave"],
    answer: "Assist",
  },

  // Moderate
  {
    word: "Brave",
    options: ["Cowardly", "Courageous", "Weak", "Nervous"],
    answer: "Courageous",
  },

  {
    word: "Honest",
    options: ["Truthful", "Rude", "Clever", "Angry"],
    answer: "Truthful",
  },

  {
    word: "Difficult",
    options: ["Easy", "Simple", "Challenging", "Small"],
    answer: "Challenging",
  },

  {
    word: "Famous",
    options: ["Unknown", "Popular", "Weak", "Quiet"],
    answer: "Popular",
  },

  {
    word: "Dangerous",
    options: ["Safe", "Risky", "Easy", "Calm"],
    answer: "Risky",
  },

  {
    word: "Important",
    options: ["Useless", "Significant", "Small", "Normal"],
    answer: "Significant",
  },

  {
    word: "Choose",
    options: ["Select", "Reject", "Forget", "Remove"],
    answer: "Select",
  },

  {
    word: "Improve",
    options: ["Damage", "Enhance", "Destroy", "Reduce"],
    answer: "Enhance",
  },

  {
    word: "Correct",
    options: ["Wrong", "Accurate", "False", "Bad"],
    answer: "Accurate",
  },

  {
    word: "Quiet",
    options: ["Noisy", "Silent", "Loud", "Busy"],
    answer: "Silent",
  },

  // Challenging
  {
    word: "Abundant",
    options: ["Rare", "Plentiful", "Empty", "Limited"],
    answer: "Plentiful",
  },

  {
    word: "Ancient",
    options: ["Modern", "Old", "New", "Recent"],
    answer: "Old",
  },

  {
    word: "Rapid",
    options: ["Slow", "Swift", "Weak", "Late"],
    answer: "Swift",
  },

  {
    word: "Precise",
    options: ["Accurate", "Random", "Rough", "Unclear"],
    answer: "Accurate",
  },

  {
    word: "Essential",
    options: ["Unnecessary", "Necessary", "Optional", "Useless"],
    answer: "Necessary",
  },

  {
    word: "Reliable",
    options: ["Trustworthy", "Dangerous", "Weak", "Uncertain"],
    answer: "Trustworthy",
  },

  {
    word: "Obtain",
    options: ["Lose", "Acquire", "Destroy", "Forget"],
    answer: "Acquire",
  },

  {
    word: "Observe",
    options: ["Ignore", "Watch", "Forget", "Remove"],
    answer: "Watch",
  },

  {
    word: "Prevent",
    options: ["Allow", "Stop", "Create", "Continue"],
    answer: "Stop",
  },

  {
    word: "Complex",
    options: ["Simple", "Complicated", "Easy", "Clear"],
    answer: "Complicated",
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

restartBtn.addEventListener("click", function () {
  currentQuestion = 0;
  score = 0;

  scoreElement.textContent = score;

  nextBtn.disabled = false;

  loadQuestion();
});

loadQuestion();
