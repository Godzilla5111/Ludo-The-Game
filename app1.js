alert("Hello");

var gridOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

var orderA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var startA = orderA[0];
var flagA = 0;




var orderB = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var startB = orderB[0];
var flagB = 0;


var chance = true;



//Position of coins on the grid
var currentPositonA1 = startA;
var currentPositonA2 = startA;


var currentPositonB1 = startB;
var currentPositonB2 = startB;

var randomNumberA;
var randomDiceImageA;


var coins = [];
var releaseValueA = false;
var releaseValueB = false;



function moveOnClick(arr, num) {

  if (arr.length > 2) {
    var colorToBeRemovedOnClick = arr[2];
    arr.remove("" + colorToBeRemovedOnClick);
    var classNumberOfClickedSquare = arr[0];
    var numberCorrespondingToClassNumberOfClickedSquare = parseInt((arr[0]).replace(/^\D+/g, ''));
    // console.log(numberCorrespondingToClassNumberOfClickedSquare);
    if ((numberCorrespondingToClassNumberOfClickedSquare + num) < 28) {
      var classOfNextSquareToBeHighlighted = ("._" + (numberCorrespondingToClassNumberOfClickedSquare + num));
      document.querySelector(classOfNextSquareToBeHighlighted).classList.add("colorA");
    } else {
      console.log("Coin completed!");
    }
  }
}

var flag = false;


// document.querySelector("._5").classList.add("colorA");

function squareClick(num) {
  var nextMove = num;
  var arrayOfSquares = document.querySelectorAll(".square")
  arrayOfSquares.forEach((square, i) => {
    square.addEventListener("click", function() {
      moveOnClick(this.classList, nextMove);
      flag = true;
    });
  });

}



function coinRelease() {
  coins = document.querySelectorAll(".coin");
  coins.forEach((coin) => {
    coin.addEventListener("click", function() {
      // console.log("Coin Clicked!");
      // console.log(this.classList);
      this.classList.remove("colorA");
      document.querySelector("._" + startA).classList.add("colorA");
    });
  });
  alert("Click on the button to roll again!");
}

// squareClick(2);

function diceRollA() {
  if (chance === true) { //Turn checker


    randomNumberA = Math.floor(Math.random() * 6) + 1; //1-6


    randomDiceImageA = "dice" + randomNumberA + ".png"; //dice1.png - dice6.png


    var imgA = document.querySelectorAll("img")[0];

    imgA.setAttribute("src", randomDiceImageA);


    if (randomNumberA !== 6) {

      if (flagA === 0) {
        //Kuch mat karo!
      } else if (flagA === 1) {
        alert("Click on the coin to move!");
        squareClick(randomNumberA);
        // moveClickedCoin();
      } else if (flagA === 2) {

        // squareClick(randomNumberA);
        alert("Your Both tokens are active!Click on that token which you intend to move!");
        squareClick(randomNumberA);
      }
      chance = !chance;
    } else {
      if (randomNumberA === 6) {
        if (flagA === 0) {
          releaseValueA = true;
          flagA++;
          alert("Click on the coin to release it playerA!");

          coinRelease();
        } else if (flagA === 1) {
          var choicefor2ndToken = prompt("You have one active token playerA! Do you want to move it or release a new token? (1--release new  0--move current)");
          console.log(choicefor2ndToken);
          if (choicefor2ndToken === "1") {
            releaseValueA = true;
            alert("Click on the coin to release it playerA!");
            coinRelease();
            flagA++;

          } else if (choicefor2ndToken === "0") {
            alert("Click on the coin to move!");
            squareClick(randomNumberA);
            // alert("Roll again!");
            // diceRollA();
          }

        } else if (flagA === 2) {
          alert("Your both tokens are active now playerA! Click on the token that you want to move!");
          squareClick(randomNumberA);
          // alert("Roll Again!");
          // diceRollA();
        }
      }
    }
  } else { //Turn checker!
    alert("Not your Turn!");
  }

}

function diceRollB() {
  if (chance === false) {
    var randomNumberB = Math.floor(Math.random() * 6) + 1; //1-6

    var randomDiceImageB = "dice" + randomNumberB + ".png"; //dice1.png - dice6.png


    var imgB = document.querySelectorAll("img")[1];

    imgB.setAttribute("src", randomDiceImageB);

    if ((randomNumberB === 6) && (flagB === 0)) {
      document.querySelector("._" + startB).classList.add("colorB");
      flagB++;

    }
    chance = !chance;

  } else {
    alert("Not Your Turn!");
  }
}
