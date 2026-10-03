// 1. List of words, each with a hint
const words = [
  {
    word: "computer",
    hint: "An electronic machine used to process information.",
  },
  { word: "keyboard", hint: "A device used to type letters and numbers." },
  { word: "javascript", hint: "A language used to make websites interactive." },
  {
    word: "internet",
    hint: "A network that connects computers around the world.",
  },
  { word: "programming", hint: "Writing instructions for a computer." },
  { word: "website", hint: "A collection of pages on the internet." },
  { word: "developer", hint: "A person who creates software." },
  { word: "database", hint: "A place where data is stored." },
  { word: "algorithm", hint: "Steps used to solve a problem." },
  { word: "software", hint: "Programs that run on a computer." },
  { word: "browser", hint: "A program used to open websites." },
  { word: "network", hint: "Connected computers that share information." },
  { word: "password", hint: "A secret word used to protect an account." },
  { word: "android", hint: "An operating system used in smartphones." },
  { word: "python", hint: "A popular programming language." },
  { word: "server", hint: "A computer that provides data to other computers." },
  { word: "laptop", hint: "A portable computer." },
  { word: "smartphone", hint: "A mobile phone that can run apps." },
  { word: "program", hint: "Instructions given to a computer." },
  { word: "hardware", hint: "The physical parts of a computer." },
  { word: "application", hint: "Software made for a specific task." },
  { word: "cloud", hint: "A way to store data online." },
  { word: "robot", hint: "A machine that can perform tasks." },
  { word: "technology", hint: "Science used to create useful tools." },
  { word: "security", hint: "Protection of data and computers." },
  { word: "memory", hint: "A part of a computer that stores data." },
  { word: "monitor", hint: "A screen that shows computer information." },
  { word: "mouse", hint: "A device used to control the pointer." },
  { word: "coding", hint: "Writing instructions for a computer." },
  { word: "debugging", hint: "Finding and fixing errors in a program." },
];

// 2. Game variables
let currentWord = "";
let currentHint = "";
let score = 100;
let wrongMoves = 0;
let hiddenPositions = [];

// 3. Get elements from the HTML page
const wordDisplay = document.getElementById("wordDisplay");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const wrongDisplay = document.getElementById("wrongMoves");
const face = document.getElementById("face");
const message = document.getElementById("message");

// 4. Start or restart the game
function startGame() {
  const randomIndex = Math.floor(Math.random() * words.length);

  currentWord = words[randomIndex].word;
  currentHint = words[randomIndex].hint;

  score = 100;
  wrongMoves = 0;
  hiddenPositions = [];

  scoreDisplay.textContent = score;
  wrongDisplay.textContent = wrongMoves;
  face.textContent = "🙂";
  message.textContent = "";
  submitBtn.disabled = false;

  showWord();
}

// 5. Show the word
function showWord() {
  wordDisplay.innerHTML = "";

  const howManyToShow = Math.round(currentWord.length * 0.3);
  const shownPositions = [];

  while (shownPositions.length < howManyToShow) {
    const position = Math.floor(Math.random() * currentWord.length);

    if (!shownPositions.includes(position)) {
      shownPositions.push(position);
    }
  }

  for (let i = 0; i < currentWord.length; i++) {
    if (shownPositions.includes(i)) {
      wordDisplay.appendChild(makeLetterBox(currentWord[i]));
    } else {
      hiddenPositions.push(i);

      const input = document.createElement("input");

      input.type = "text";
      input.maxLength = 1;
      input.className = "letter-input";
      input.dataset.position = i;

      wordDisplay.appendChild(input);
    }
  }
}

// 6. Make a letter box
function makeLetterBox(letter) {
  const box = document.createElement("div");

  box.className = "letter";
  box.textContent = letter.toUpperCase();

  return box;
}

// 7. Submit button
submitBtn.onclick = function () {
  const inputs = document.querySelectorAll(".letter-input");
  let allCorrect = true;

  for (const input of inputs) {
    const position = Number(input.dataset.position);
    const typedLetter = input.value.toLowerCase();

    if (typedLetter !== currentWord[position]) {
      allCorrect = false;
      break;
    }
  }

  // Correct answer
  if (allCorrect) {
    score = score + 20;

    scoreDisplay.textContent = score;

    // Show happy emoji first
    face.textContent = "😃";
    message.textContent = "Correct! You found the word.";

    // Show alert after emoji appears
    setTimeout(function () {
      alert("🎉 Congratulations! You won the game!");
    }, 300);

    submitBtn.disabled = true;

    return;
  }

  // Wrong answer
  wrongMoves = wrongMoves + 1;
  score = score - 10;

  wrongDisplay.textContent = wrongMoves;
  scoreDisplay.textContent = score;

  face.textContent = "😞";

  // Game over
  if (wrongMoves === 5) {
    message.textContent =
      "Game Over! The word was " + currentWord.toUpperCase();

    submitBtn.disabled = true;

    return;
  }

  // Show hint
  message.textContent = "Hint: " + currentHint;

  // Every 2 wrong moves, reveal one letter
  if (wrongMoves % 2 === 0) {
    revealOneLetter();
  }
};

// 8. Press Enter to submit
wordDisplay.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
  }
});

// 9. Reveal one hidden letter
function revealOneLetter() {
  if (hiddenPositions.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * hiddenPositions.length);

  const position = hiddenPositions[randomIndex];

  hiddenPositions.splice(randomIndex, 1);

  const inputs = document.querySelectorAll(".letter-input");

  for (const input of inputs) {
    if (Number(input.dataset.position) === position) {
      input.replaceWith(makeLetterBox(currentWord[position]));
      break;
    }
  }
}

// 10. Restart button
restartBtn.onclick = function () {
  startGame();
};

// 11. Left/right arrow keys
wordDisplay.addEventListener("keydown", function (event) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }

  const inputs = Array.from(document.querySelectorAll(".letter-input"));
  const currentIndex = inputs.indexOf(event.target);

  if (event.key === "ArrowLeft" && currentIndex > 0) {
    inputs[currentIndex - 1].focus();
  }

  if (event.key === "ArrowRight" && currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus();
  }

  event.preventDefault();
});

// 12. Start the game
startGame();
