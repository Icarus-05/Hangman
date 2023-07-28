const hangmanImg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessestext = document.querySelector(".guesses-text b");
const KeyboardDiv = document.querySelector(".keyboard");
const gamemodel = document.querySelector(".game-model");
const playagainbtn = gamemodel.querySelector("button");
let currword,correctletters, wrongcount;
const maxguesses=6;

const resetgame = () => {
    correctletters=[];
    wrongcount=0;
    hangmanImg.src = `images/hangman-${wrongcount}.svg`;
    guessestext.innerText=`${wrongcount} / ${maxguesses}`;
    KeyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    wordDisplay.innerHTML = currword.split("").map(() => `<li class= 'letter'></li>`).join("");
    gamemodel.classList.remove("show");
}
const getRandomword = () => {
    const {word, hint}= WordList[Math.floor(Math.random() *WordList.length)];
    console.log(word);
    currword=word;
    document.querySelector(".hint-text b").innerText=hint;
    resetgame();

}

const gameover = (isVictory) => {
    setTimeout(() =>{
        const modeltext = isVictory ? `You got the word:` : `The correct word is:`;
        gamemodel.querySelector("img").src=`images/${isVictory ? 'victory' : 'lost'}.gif`;
        gamemodel.querySelector("h4").innerText=`${isVictory ? 'Congrats' : 'GameOver'}`;
        gamemodel.querySelector("p").innerHTML=`${modeltext} <b>${currword}</b>`;
        gamemodel.classList.add("show");
    },300);
}
const initgame = (button, letterclicked) =>{
    if (currword.includes(letterclicked)) {
        [...currword].forEach((letter,index) => {
            if(letter===letterclicked) {
                correctletters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        wrongcount++;
        hangmanImg.src = `images/hangman-${wrongcount}.svg`;
    }

    button.disabled='true';
    guessestext.innerText= `${wrongcount} / ${maxguesses}`;

    if(wrongcount === maxguesses) return gameover(false);
    if(correctletters.length === currword.length) return gameover(true);
}


for (let i=97; i<=122; i++) {
    const button = document.createElement("button");
    button.innerText=String.fromCharCode(i);
    KeyboardDiv.appendChild(button);
    button.addEventListener("click",e => initgame(e.target,String.fromCharCode(i)));

}

getRandomword();
playagainbtn.addEventListener("click",getRandomword);
