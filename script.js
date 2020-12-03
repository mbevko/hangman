//DOM variables
let guessedLetter = document.querySelector("#guessed-letter");
let newGame = document.querySelector("#new-game");
let currentWord = document.querySelector("#current-word");
let wordContainer = document.querySelector("#word-container");
let playerStatus = document.querySelector("#player-status");
let playerInput = document.querySelector("#player-guess")
let guessBtn = document.querySelectorAll("#player-guess-container .guess");
let badGuess = document.querySelector(".bad_guess")
let gallow = document.querySelectorAll("g .gallow")
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let hangingGuy = document.querySelectorAll("g rect");


const wordList = ["empire", "lightsaber", "wookiee", "mandalorian", "jedi", "stormtrooper", "force", "droid", "ewoks", "sith", "padawan", "yoda", "tatooine", "kashyyyk", "blaster", "clone"];

guessBtn.forEach(letter => {
    letter.setAttribute("disabled", "")
})



let newWord = "";
const wordSelector = () => {
    let random = Math.floor(Math.random() * wordList.length);

    newWord = wordList[random]
    console.log(newWord)
};

//creating letter spaces
const blankSpaces = () => {
    for (let i = 0; i < newWord.length; i++) {
        let div = document.createElement("div");
        wordContainer.appendChild(div)
        div.className = "test";
        //someVariable I can iterate through
    };
}

//Deleting letter spaces
const removeSpaces = () => {
    let currentWordArr = wordContainer.querySelectorAll(".test");

    currentWordArr.forEach(spaces => {
        spaces.remove()
    });
};

//player guess
let wrongLetters = []
let rightLetters = [];
let finalWord = []

guessBtn.forEach(letter => {
    letter.addEventListener('click', () => {
        let currentWord = newWord.split("")
        let currentWordArr = wordContainer.querySelectorAll(".test");
        letter.setAttribute("disabled", "true")
        //bad guess
        if (!currentWord.includes(letter.innerText.toLowerCase())) {
            wrongLetters.push(letter.innerText);
            badGuess.innerHTML = wrongLetters.join(' ');
            //good guess
        } else {
            rightLetters.push(letter.innerText)
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === letter.innerText.toLowerCase()) {
                    currentWordArr[i].innerHTML = letter.innerText
                    finalWord.push(letter.innerText)
                }
            };
            if (finalWord.length === currentWord.length) {
                win.style.display = "block"
                guessBtn.forEach(button => {
                    button.setAttribute("disabled", "")
                });
            }
        };
//bad guess conditions for hanging the man
        if (wrongLetters.length === 1) {
            for (let i = 0; i < gallow.length; i++) {
                gallow[i].style.display = "block";
            }
        } else if (wrongLetters.length === 2) {
            document.querySelector(".head").style.display = "block";
        } else if (wrongLetters.length === 3) {
            document.querySelector(".neck").style.display = "block";
        } else if (wrongLetters.length === 4) {
            document.querySelector(".right_arm").style.display = "block";
        } else if (wrongLetters.length === 5) {
            document.querySelector(".left_arm").style.display = "block";
        } else if (wrongLetters.length === 6) {
            document.querySelector(".torso").style.display = "block";
        } else if (wrongLetters.length === 7) {
            document.querySelector(".right_leg").style.display = "block";
        } else if (wrongLetters.length === 8) {
            document.querySelector(".left_leg").style.display = "block";
            lose.style.display = "block";
            guessBtn.forEach(button => {
                button.setAttribute("disabled", "")
            })
        }
    })
});

//clear the board to start a new game
newGame.addEventListener('click', () => {
    removeSpaces();
    wordSelector();
    let currentWordSplit = newWord.split("");
    blankSpaces()
    wrongLetters = [];
    rightLetters = [];
    finalWord = [];
    badGuess.innerHTML = wrongLetters
    win.style.display = "none";
    lose.style.display = "none";
    hangingGuy.forEach(piece => {
        piece.style.display = "none";
    });
    document.querySelector(".head").style.display = "none";

    guessBtn.forEach(letter => {
        if (letter.hasAttribute("disabled", "")) {
            letter.removeAttribute("disabled", "")
        }
    })
});