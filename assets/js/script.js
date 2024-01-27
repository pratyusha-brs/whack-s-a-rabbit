const holes =document.querySelectorAll(".hole");
const scoreBoard=document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const timer = document.getElementById("timer");
let gameStartBtn = document.getElementById("gameStartBtn");

let ms=20000;
// initialise variables
let lastHole;
let timeUp=false;       
let score=0;
//default theme
let chathams_blue ="#1A4B84";
// function to generate time interval
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
//function to randomly select a hole
function randomHole(holes){
    const idx=Math.floor(Math.random() * holes.length)
     const hole=holes[idx];
    if(hole===lastHole){
        return randomHole(holes);
    }
    lastHole= hole;
    return hole;
}
//function to make a mole appear
function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
      hole.classList.remove("up");
      if (!timeUp) peep();
    }, time);
  }
  

//UpdateSeconds
function updateSeconds(){
    ms=ms-1000;
    const seconds =Math.floor(ms/1000);
    console.log(seconds);
    timer.innerText =`Time${seconds} seconds left`;
}
// function to start the game
function startGame(){
    timer.classList.remove("text-danger");
    const gameInterval= setInterval(updateSeconds,1000);
    gameStartBtn.style.display ="none";
    scoreBoard.textContent =`score:0`;
    timeUp = false;
    score=0;
    peep();
    setTimeout(() => {
        timeUp = true;
        clearInterval(gameInterval);
        ms = 20000;
        timer.classList.add("text-danger");
        timer.innerText = `Time up`;
        gameStartBtn.style.display = "inline-block";
      }, 20000);
}    
//function to handle a mole being "bonked"(clicked on)
function bonk(e){
    console.log(e);
    if (!e.isTrusted|| timeUp) return;
    score++;
    this.classList.remove("up");
    scoreBoard.textContent=`Score ${score}`;
}
// add event listener for each mole 
moles.forEach((mole)=>mole.addEventListener("click",bonk));


// Function to change the theme by updating CSS variables and storing the selected theme in local storage
function setTheme(theme) {
    document.documentElement.style.setProperty("--primary-color", theme);
    localStorage.setItem("movie-theme", theme);
  }
  
  // Set the initial theme to the value stored in local storage or the default 'chathams_blue'
  setTheme(localStorage.getItem("movie-theme") || chathams_blue);


