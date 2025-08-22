let gameSequence = [];
let userSequence = [];

let buttons = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

let h3 = document.createElement("h3");
document.body.prepend(h3);

h3.innerText = `Highest Score: ${highestScore}`;

// // starting game and levelUP
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});

// game falsh
function gameFlash(btn) {
  btn.classList.add("btnFlash");
  setTimeout(function () {
    btn.classList.remove("btnFlash");
  }, 100);
}

// user click flash
function UserFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 150);
}

// levelUP and chosse random index for buttons
function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = buttons[randomIdx];
  let randomButton = document.querySelector(`.${randomColor}`);
  gameSequence.push(randomColor);
  console.log("gameSequence have ", gameSequence);
  gameFlash(randomButton);
}

function checkButtonSequence(sequenceIdx) {
  if (userSequence[sequenceIdx] === gameSequence[sequenceIdx]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 200);
    }
  } else {
    if (level - 1 > highestScore) {
      highestScore = level - 1;
      h3.innerText = `Highest Score: ${highestScore}`;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    resetGame();
  }
}

function buttonPress() {
  // console.log(this);
  let button = this;
  UserFlash(button);

  userColor = button.getAttribute("id");
  userSequence.push(userColor);

  checkButtonSequence(userSequence.length - 1);
}

let allButtons = document.querySelectorAll(".btn");

for (btn of allButtons) {
  btn.addEventListener("click", buttonPress);
}

function resetGame() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
