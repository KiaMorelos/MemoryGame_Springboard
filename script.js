const gameContainer = document.getElementById("game");
const startGame = document.querySelector("button")
const currentScore = document.querySelector(".current")
const showBestScore = document.querySelector(".previous")

let countGameClicks = 0;

gameContainer.classList.add("static")

currentScore.innerText = `${countGameClicks}`

//get the stuff i saved to local storage back on the page
bestScore = JSON.parse(localStorage.getItem("best score")) || [];

showBestScore.innerText = `${bestScore}`


startGame.addEventListener('click', function(){
 gameContainer.classList.toggle("static") //remove disabled clicking class
 startGame.classList.toggle('gameStarted')
 startGame.innerText = "Game Started!"
})


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "pink"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("faceDown");


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickCount = 0;
function handleCardClick(event) {
  clickCount++
  countGameClicks++
  currentScore.innerText = `${countGameClicks}`

 
  if(clickCount <= 2){
    event.target.classList.toggle('faceDown') 
    //turn off face down class, show card
    event.target.classList.toggle('faceUp')
    setTimeout(function() {
      //reset click count. turn face down class back on, and remove faceUp class after 1s 
      gameContainer.classList.toggle('noClickingAllowed')

      areMatching()

     clickCount = 0;
     event.target.classList.toggle('faceDown')
     event.target.classList.toggle('faceUp')
     gameContainer.classList.toggle('noClickingAllowed')

    }, 1500)
  } 
}

function areMatching (){
  let cardCheck = []

  let cardsUp = document.getElementsByClassName('faceUp')
  
  //only run if there are two cards faceUp
 if(cardsUp.length === 2){
  
    for(let i of cardsUp){
      cardCheck.push(i)
    } 
    
    //check for matches. Using CSS class values to find match. If match is found turn of the faceDown class and add 'matched' class, which disables pointer events - turning the cards back over to get the same match twice. Tried this first by comparing entire elements but kept getting a false value no matter what - I still don't know why.

    let update = document.getElementById("update")

    if(cardCheck[0].classList.value === cardCheck[1].classList.value){
      cardCheck[0].classList.toggle('matched')
      cardCheck[0].classList.toggle('faceDown')
      cardCheck[1].classList.toggle('matched')
      cardCheck[1].classList.toggle('faceDown')
      hasWon()
    } 
 } 

function hasWon(){

  let matchedCards = document.getElementsByClassName('matched')
  bestScore = JSON.parse(localStorage.getItem("best score"))
  if(matchedCards.length === 12){
    let update = document.getElementById("update")
    update.innerText = "You won the game!"
    alert("You won!")

    if(bestScore.length ===  0 || bestScore === 0){
      bestScore = countGameClicks
      localStorage.setItem("best score", JSON.stringify(bestScore))
      } 

    if(countGameClicks < bestScore){
    bestScore = countGameClicks
    localStorage.setItem("best score", JSON.stringify(bestScore))
    } 
  }
}

}

//I'm planning to work on the further study points for this project as time allows - but wanted to turn it in right away now that explicit requirements are met. I feel reasonably certain I know how to do most of them. 

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

