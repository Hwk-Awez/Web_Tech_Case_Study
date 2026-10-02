let words = [
    "computer",
    "keyboard",
    "javascript",
    "internet",
    "programming",
    "website",
    "developer",
    "database",
    "algorithm",
    "software"
];

let currentWord = "";
let hiddenPositions = [];

let score = 100;
let wrongMoves = 0;

let wordDisplay = document.getElementById("wordDisplay");
let inputArea = document.getElementById("inputArea");

let submitBtn = document.getElementById("submitBtn");
let restartBtn = document.getElementById("restartBtn");

let scoreDisplay = document.getElementById("score");
let wrongMovesDisplay = document.getElementById("wrongMoves");

let face = document.getElementById("face");
let message = document.getElementById("message");


function startGame() {

    let randomIndex = Math.floor(Math.random() * words.length);

    currentWord = words[randomIndex];

    score = 100;
    wrongMoves = 0;
    hiddenPositions = [];

    scoreDisplay.textContent = score;
    wrongMovesDisplay.textContent = wrongMoves;

    face.textContent = "🙂";
    message.textContent = "";

    submitBtn.disabled = false;

    createWord();
}


function createWord() {

    wordDisplay.innerHTML = "";
    inputArea.innerHTML = "";

    let revealCount = Math.round(currentWord.length * 0.3);

    let revealedPositions = [];

    while (revealedPositions.length < revealCount) {

        let randomPosition =
            Math.floor(Math.random() * currentWord.length);

        if (!revealedPositions.includes(randomPosition)) {
            revealedPositions.push(randomPosition);
        }
    }

    for (let i = 0; i < currentWord.length; i++) {

        if (revealedPositions.includes(i)) {

            let letter = document.createElement("div");

            letter.className = "letter";
            letter.textContent = currentWord[i].toUpperCase();

            wordDisplay.appendChild(letter);

        } else {

            hiddenPositions.push(i);

            let input = document.createElement("input");

            input.type = "text";
            input.maxLength = 1;
            input.className = "letter-input";
            input.dataset.position = i;

            wordDisplay.appendChild(input);
        }
    }
}


submitBtn.addEventListener("click", function() {

    let inputs = document.querySelectorAll(".letter-input");

    let correct = true;

    for (let i = 0; i < inputs.length; i++) {

        let position = Number(inputs[i].dataset.position);
        let userLetter = inputs[i].value.toLowerCase();

        if (userLetter !== currentWord[position]) {
            correct = false;
            break;
        }
    }

    if (correct) {

        score = score + 20;

        scoreDisplay.textContent = score;

        face.textContent = "😃";
        message.textContent = "Correct! You found the word.";

        submitBtn.disabled = true;

        return;
    }

    wrongMoves++;
    score = score - 10;

    scoreDisplay.textContent = score;
    wrongMovesDisplay.textContent = wrongMoves;

    face.textContent = "😞";

    if (wrongMoves >= 5) {

        message.textContent =
            "Game Over! The word was " + currentWord.toUpperCase();

        submitBtn.disabled = true;

        return;
    }

    message.textContent =
        "Wrong prediction. Try again.";

    if (wrongMoves % 2 === 0) {
        revealLetter();
    }

});


function revealLetter() {

    if (hiddenPositions.length === 0) {
        return;
    }

    let randomIndex =
        Math.floor(Math.random() * hiddenPositions.length);

    let position = hiddenPositions[randomIndex];

    hiddenPositions.splice(randomIndex, 1);

    let inputs = document.querySelectorAll(".letter-input");

    for (let i = 0; i < inputs.length; i++) {

        if (Number(inputs[i].dataset.position) === position) {

            let letter = document.createElement("div");

            letter.className = "letter";
            letter.textContent = currentWord[position].toUpperCase();

            inputs[i].replaceWith(letter);

            break;
        }
    }

    message.textContent =
        "A letter has been revealed.";
}


restartBtn.addEventListener("click", function() {
    startGame();
});


startGame();
