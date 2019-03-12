const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
let missed = 0;
let letterFound = null;
let ol = document.querySelector('ol');
let tries = document.querySelectorAll('.tries');
const classShow = document.getElementsByClassName('show');
const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');
const title = document.getElementsByClassName('title')[0];

const phrases = [
  'as right as rain',
  'time will tell',
  'never give up',
  'live and learn',
  'break the ice'
];

// Hide the start screen overlay
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Choose a phrase from the phrases array and split into a new array of characters
function getRandomPhraseAsArray(arr) {
  let RandomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  let RandomSplit = RandomPhrase.split('');
  return RandomSplit;
};

// Set the game display
function addPhraseToDisplay(arr) {
  for (i = 0; i < arr.length; i += 1) {
    const ul = phrase.querySelector('ul');
    let li = document.createElement('li');
    li.textContent = arr[i];
    ul.appendChild(li);
    if (arr[i] != " ") {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
};

// Call and append phrase to display
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check if selected letter matches those in phrases
function checkLetter(button) {
  for (i = 0; i < letters.length; i += 1) {
      if (letters[i].textContent === button ) {
          letters[i].classList.add('show');
          letters[i].style.transition = 'all 2s';
          letterFound = letters[i].textContent;
      }
  }
  return letterFound;
}

// Listen to user interaction and call checkLetter function on selections
qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const buttonChosen = button.textContent;
    button.classList.add('chosen');
    console.log(button.textContent);
    checkLetter(buttonChosen);
    letterFound = null;
    button.disabled = true;
    console.log(checkLetter(buttonChosen));
    if (letterFound === null) {
      missed += 1;
      ol.removeChild(tries[missed - 1]);
    }
    checkWin();
  }
})

// Check whether the game has been won or lost
function checkWin() {
  if (classShow.length === letters.length && missed <= 5) {
    title.textContent = "Congrats, you won!";
    overlay.style.display = "";
    overlay.classList.add('win');
    startButton.textContent = "Retry";
    startButton.addEventListener('click', () => {
      location.reload();
    })
  } else if (missed >= 5) {
    title.textContent = "Sorry, try again!";
    overlay.style.display = "";
    overlay.classList.add('lose');
    startButton.textContent = "Retry";
    startButton.addEventListener('click', () => {
      location.reload();
    })
  }
}
