// 1. List of sentences (easy first, then moderate)
const sentences = [
  // Easy

  "I am going to school.",
  "She is reading a book.",
  "He plays football every day.",
  "We are learning JavaScript.",
  "The sun rises in the east.",
  "I like playing computer games.",
  "My friend lives in Bhubaneswar.",
  "They are watching a movie.",
  "The cat is sleeping on the bed.",
  "Technology makes our life easier.",
  "I drink milk every morning.",
  "The dog is running in the park.",
  "My mother cooks tasty food.",
  "Birds are flying in the sky.",
  "We play cricket on Sunday.",

  // Moderate

  "Our teacher explains every lesson clearly.",
  "Regular practice helps students learn better.",
  "The train to Puri leaves in the morning.",
  "She finished her homework before dinner.",
  "Learning a new language takes daily practice.",
  "The library is quiet during the exams.",
  "He saved money to buy a new laptop.",
  "Good friends always help each other.",
  "The web page changes when you click the button.",
  "Many people use mobile phones to learn.",
  "My brother enjoys playing games after school.",
  "We visited the park with our friends.",
  "The students are preparing for their exams.",
  "She likes watching movies with her family.",
  "The teacher gave us an interesting activity.",
  "I usually complete my homework in the evening.",
  "The computer works faster after the update.",
  "They went to the market to buy vegetables.",
  "My friends and I practice football every evening.",
  "The internet helps us find information quickly.",
];

// 2. Game variables
let currentSentence = "";
let jumbledWords = [];
let selectedWords = []; // stores the index of each selected word
let score = 100;
let wrongMoves = 0;

// 3. Get HTML elements
const jumbledWordsArea = document.getElementById("jumbledWords");
const answerArea = document.getElementById("answerArea");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreDisplay = document.getElementById("score");
const wrongDisplay = document.getElementById("wrongMoves");

const message = document.getElementById("message");
const face = document.getElementById("face");

// 4. Start the game
function startGame() {
  score = 100;
  wrongMoves = 0;

  scoreDisplay.textContent = score;
  wrongDisplay.textContent = wrongMoves;

  face.textContent = "🙂";
  message.textContent = "";

  submitBtn.disabled = false;

  loadSentence();
}

// 5. Load a sentence
// 5. Load a sentence
function loadSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  selectedWords = [];

  // Reset previous question
  message.textContent = "";
  face.textContent = "🙂";
  submitBtn.disabled = false;

  // Split the sentence into words and shuffle them
  jumbledWords = currentSentence.replace(".", "").split(" ");
  shuffle(jumbledWords);

  showJumbledWords();
  showAnswer();
}

// 6. Shuffle words
function shuffle(array) {
  array.sort(function () {
    return Math.random() - 0.5;
  });
}

// 7. Show jumbled words
function showJumbledWords() {
  jumbledWordsArea.innerHTML = "";

  jumbledWords.forEach(function (word, index) {
    const button = document.createElement("button");
    button.textContent = word;
    button.className = "word-button";

    button.onclick = function () {
      selectWord(index);
    };

    jumbledWordsArea.appendChild(button);
  });
}

// 8. Select a word
function selectWord(index) {
  // Ignore if the word is already selected
  if (!selectedWords.includes(index)) {
    selectedWords.push(index);
    showAnswer();
  }
}

// 9. Show selected words
function showAnswer() {
  answerArea.innerHTML = "";

  selectedWords.forEach(function (index) {
    const span = document.createElement("span");
    span.textContent = jumbledWords[index];
    span.className = "answer-word";
    answerArea.appendChild(span);
  });
}

// 10. Submit answer
submitBtn.onclick = function () {
  // Join selected words and add the full stop
  const userSentence =
    selectedWords
      .map(function (index) {
        return jumbledWords[index];
      })
      .join(" ") + ".";

  // Correct answer
  if (userSentence.toLowerCase() === currentSentence.toLowerCase()) {
    score = score + 20;
    scoreDisplay.textContent = score;

    face.textContent = "😃";
    message.textContent = "Correct! You constructed the sentence.";

    // Alert after emoji appears
    setTimeout(function () {
      alert("🎉 Congratulations! Correct Sentence!");
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

  // Automatically clear the selected words
  selectedWords = [];
  showAnswer();

  // Game over
  if (wrongMoves === 5) {
    message.textContent =
      "Game Over! The correct sentence was: " + currentSentence;
    submitBtn.disabled = true;
    return;
  }

  message.textContent = "Wrong order. Try arranging the words again.";
};

// 11. Clear selected words
clearBtn.onclick = function () {
  selectedWords = [];
  showAnswer();
  message.textContent = "";
  face.textContent = "🙂";
};

// 12. Next sentence
nextBtn.onclick = loadSentence;

// 13. Restart game
restartBtn.onclick = startGame;

// 14. Enter key to submit
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
  }
});

// 15. Start game when page opens
startGame();
