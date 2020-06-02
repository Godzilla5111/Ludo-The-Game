alert("hi");
var gridOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

var orderA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var startA = orderA[0];
var flagA = 0; //Depicts the number of coins out of locker for player A
var numberOfCoinsCompletedA = 0;




var orderB = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var startB = orderB[0];
var flagB = 0; //Depicts the number of coins out of locker for player B
var numberOfCoinsCompletedB = 0;


var randomNumberA;
var randomDiceImageA;


var randomNumberB;
var randomDiceImageB;


var arrA = [];
var arrB = [];
var chance = true; //PlayerA starts the game!
var playerA = prompt("Enter Your Name PlayerA!");
var playerB = prompt("Enter Your Name PlayerB!");

// var startSquareA = document.querySelector("._" + startA);
var startSquareA = document.querySelector("._" + 1);
// var startSquareB = document.querySelector("._" + startB);
var startSquareB = document.querySelector("._" + 15);

var arrayOfsquares = document.querySelectorAll(".square");

var number;
var arrr;

var clickStartA;
var clickEndA;

var clickStartB;
var clickEndB;

var numberOfBlueSquares = 0;
var numberOfRedSquares = 0;



function listToArray(list) {
  var arr = [];
  for (var node = list; node; node = node.rest) {
    arr.unshift(node.value);

  }
  return arr[0].split(" ");
}



function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}


function sendBackToLocker(arr, num) {
  console.log(arr);
  console.log(num);
}



function moveOnClickA(arr, num) {
  //extract the clicked square number from the class number of the clicked square!
  clickStartA = parseInt((arr[0]).replace(/^\D+/g, ''));
  clickEndA = clickStartA + num;
  //Check for overlapping tokens on grid!
  for (var i = 0; i < gridOrder.length; i++) {
    if (checkAvailability(listToArray(arrayOfsquares[i].classList), "colorA") === true) {
      numberOfBlueSquares++;
    }
  }
  if (numberOfBlueSquares === 2) {
    //Two blue coins on board, no overlap!
    //disappear the clicked coin
    document.querySelector("._" + clickStartA).classList.remove("colorA");
    //Check if its ending position lies within the bounds of the grid!
    if (clickEndA < gridOrder.length) {
      var nextA = document.querySelector("._" + clickEndA);

      //If next position is preoccupied by some coin
      if (listToArray(nextA.classList).length > 2) {
        if (checkAvailability(listToArray(nextA.classList), ("colorA")) === true) {
          //do nothing as the next square itself is blue!
        } else if (checkAvailability(listToArray(nextA.classList), ("colorB")) === true) {
          //Since next position is preoccupied by B/red coin, remove it and invoke sendBackToLocker function!
          nextA.classList.remove("colorB");
          nextA.classList.add("colorA");
          sendBackToLocker(listToArray(nextA.classList), numberOfCoinsCompletedB);
        }
      } else {
        //Empty square, simply place B's coin on the next position!
        nextA.classList.add("colorA");
      }
    }
  } else if (numberOfBlueSquares === 1) {
    //There's an overlap!
    //Just dont remove the color of the clicked red square and do everything same as in case of two Red squares!
    if (clickEndA < gridOrder.length) {
      var nextA = document.querySelector("._" + clickEndA);

      //If next position is preoccupied by some coin
      if (listToArray(nextA.classList).length > 2) {
        if (checkAvailability(listToArray(nextA.classList), ("colorB")) === true) {
          //do nothing as the next square itself is blue!
        } else if (checkAvailability(listToArray(nextA.classList), ("colorA")) === true) {
          //Since next position is preoccupied by B/red coin, remove it and invoke sendBackToLocker function!
          nextA.classList.remove("colorB");
          nextA.classList.add("colorA");
          sendBackToLocker(listToArray(nextA.classList), numberOfCoinsCompletedB);
        }
      } else {
        //Empty square, simply place A's coin on the next position!
        nextA.classList.add("colorA");
      }
    }
  }
  // chance = !chance;
}



function moveOnClickB(arr, num) {
  //extract the clicked square number from the class number of the clicked square!
  clickStartB = parseInt((arr[0]).replace(/^\D+/g, ''));
  clickEndB = clickStartB + num;
  //Check for overlapping tokens on grid!
  for (var i = 0; i < gridOrder.length; i++) {
    if (checkAvailability(listToArray(arrayOfsquares[i].classList), ("colorB")) === true) {
      numberOfRedSquares++;
    }
  }
  if (numberOfRedSquares === 2) {
    //Two red coins on board, no overlap!
    //disappear the clicked coin
    document.querySelector("._" + clickStartB).classList.remove("colorB");
    //Check if its ending position lies within the bounds of the grid!
    if (clickEndB < gridOrder.length) {
      var nextB = document.querySelector("._" + clickEndB);

      //If next position is preoccupied by some coin
      if (listToArray(nextB.classList).length > 2) {
        if (checkAvailability(listToArray(nextB.classList), ("colorB")) === true) {
          //do nothing as the next square itself is red!
        } else if (checkAvailability(listToArray(nextB.classList), ("colorA")) === true) {
          //Since next position is preoccupied by A/blue coin, remove it and invoke sendBackToLocker function!
          nextB.classList.remove("colorA");
          nextB.classList.add("colorB");
          sendBackToLocker(listToArray(nextB.classList), numberOfCoinsCompletedA);
        }
      } else {
        //Empty square, simply place B's coin on the next position!
        nextB.classList.add("colorB");
      }
    }
  } else if (numberOfRedSquares === 1) {
    //There's an overlap!
    //Just dont remove the color of the clicked red square and do everything same as in case of two Red squares!
    if (clickEndB < gridOrder.length) {
      var nextB = document.querySelector("._" + clickEndB);

      //If next position is preoccupied by some coin
      if (listToArray(nextB.classList).length > 2) {
        if (checkAvailability(listToArray(nextB.classList), ("colorB")) === true) {
          //do nothing as the next square itself is blue!
        } else if (checkAvailability(listToArray(nextB.classList), ("colorA")) === true) {
          //Since next position is preoccupied by A/blue coin, remove it and invoke sendBackToLocker function!
          nextB.classList.remove("colorA");
          nextB.classList.add("colorB");
          sendBackToLocker(listToArray(next.classList), numberOfCoinsCompletedA);
        }
      } else {
        //Empty square, simply place B's coin on the next position!
        nextB.classList.add("colorB");
      }
    }
  }
  // chance = !chance;
}




function clickToMove(num) {
  if ((flagA === 2 && numberOfCoinsCompletedA === 0) || (flagB === 2 && numberOfCoinsCompletedB === 0)) {
    //store the random number in another var so that it doesnot get lost.
    number = num;
    for (var i = 0; i < gridOrder.length; i++) {
      //Add event listener(click) to each square!
      arrayOfsquares[i].addEventListener("click", function() {
        //store the classList of clicked square into another array!
        arrr = listToArray(this.classList);
        //Check which colored square is clicked and invoke the corresponding function!
        if (arrr.length < 2) {
          //Plain square do nothing!
        } else if (arrr.length > 2) {
          //for blue/A coins
          if (checkAvailability(arrr, "colorA") === true) {
            if (flagA === 2 && numberOfCoinsCompletedA === 0) {
              moveOnClickA(arrr, number);
            }
          }
          //for red/B coins
          else if (checkAvailability(arrr, ("colorB")) === true) {
            if (flagB === 2 && numberOfCoinsCompletedB === 0) {
              moveOnClickB(arrr, number);
            }
          }
        }
      });
    }
  }
}




function autoMove(num) {
  //autoMove For PlayerA
  if (chance === true) {
    //i.e if playerA invoked autoMove
    //Ensure only one coin of player A is out!
    if ((flagA === 1 && numberOfCoinsCompletedA === 0) || (flagA === 2 && numberOfCoinsCompletedA === 1)) {
      //Check for coloured squares(coin(s)) on the grid!
      for (var i = 0; i < arrayOfsquares.length; i++) {
        //Since if a square is colored, it will have more than two classes applied to it!
        if (listToArray(arrayOfsquares[i].classList).length > 2) {
          //Check for blue square(coin of A)
          if (checkAvailability(listToArray(arrayOfsquares[i].classList), ("colorA")) === true) {
            //If a squre is blue, store its classList in an array;
            arrA = listToArray(arrayOfsquares[i].classList);
          } else {
            //store nothing!
          }
        }
      }
      //Now locate where the player A's sole coin is using its class number parsed to int!
      var startPositionA = parseInt((arrA[0]).replace(/^\D+/g, ''));
      //Make it disappear from its starting position!
      document.querySelector("._" + startPositionA).classList.remove("colorA");
      //If coin doesnot exceeds grid length
      if (num + startPositionA < gridOrder.length) {
        //check if the nextPosition of A is not occupied by any coin of playerB!
        var nextPositionA = document.querySelector("._" + (num + startPositionA));
        if (listToArray(nextPositionA.classList).length > 2) {
          if (checkAvailability(listToArray(nextPositionA.classList), ("colorB")) === true) {
            //Since position is already occupied by B!Send his coin(s) back to locker!
            nextPositionA.classList.remove("colorB");
            nextPositionA.classList.add("colorA");
            sendBackToLocker(listToArray(nextPositionA.classList));
          } else {
            //Do nothing!
          }
        }
        //If the next position of A is empty,simply place A's coin on that position!
        nextPositionA.classList.add("colorA");
      } else if ((num + startPositionA) >= gridOrder.length) {
        alert("Coin completed!");
        numberOfCoinsCompletedA++;
      }

    }
  } //autoMove For Player B
  else if (chance === false) {
    //i.e if playerB invoked autoMove
    //Ensure only one coin of player B is out!
    if ((flagB === 1 && numberOfCoinsCompletedB === 0) || (flagB === 2 && numberOfCoinsCompletedB === 1)) {
      //Check for coloured squares(coin(s)) on the grid!
      for (var i = 0; i < arrayOfsquares.length; i++) {
        //Since if a square is colored, it will have more than two classes applied to it!
        if (listToArray(arrayOfsquares[i].classList).length > 2) {
          //Check for red square(coin of B)
          if (checkAvailability(listToArray(arrayOfsquares[i].classList), ("colorB")) === true) {
            //If a squre is red, store its classList in an array;
            arrB = listToArray(arrayOfsquares[i].classList);
          } else {
            //store nothing!
          }
        }
      }
      //Now locate where the player B's sole coin is using its class number parsed to int!
      var startPositionB = parseInt((arrB[0]).replace(/^\D+/g, ''));
      //Make it disappear from its starting position!
      document.querySelector("._" + startPositionB).classList.remove("colorB");
      //If coin doesnot exceeds grid length
      if (num + startPositionB < gridOrder.length) {//Error
        //check if the nextPosition of B is not occupied by any coin of playerA!
        var nextPositionB = document.querySelector("._" + (num + startPositionB));
        if (listToArray(nextPositionB.classList).length > 2) {
          if (checkAvailability(listToArray(nextPositionB.classList), ("colorA")) === true) {
            //Since position is already occupied by A!Send his coin(s) back to locker!
            nextPositionB.classList.remove("colorA");
            nextPositionB.classList.add("colorB");
            sendBackToLocker(listToArray(nextPositionB.classList));
          } else {
            //Do nothing!
          }
        }
        //If the next position of B is empty,simply place B's coin on that position!
        nextPositionB.classList.add("colorB");
      } else if ((num + startPositionB) >= gridOrder.length) {//Error
        alert("Coin completed!");
        numberOfCoinsCompletedB++;
      }
    }

  }
}









function diceRollA() {
  if (chance === true) { //Player A's chance
    if (numberOfCoinsCompletedA < 2) { //check to ensure that atleast one coin of playerA has not completed the grid!
      randomNumberA = Math.floor(Math.random() * 6) + 1; //1-6
      randomDiceImageA = "dice" + randomNumberA + ".png"; //dice1.png - dice6.png

      var imgA = document.querySelectorAll("img")[0];

      imgA.setAttribute("src", randomDiceImageA);


      if (randomNumberA != 6) {
        if (flagA === 0) {
          //do nothing since no coin of PlayerA is out of the locker
        } else if ((flagA === 1) && (numberOfCoinsCompletedA === 1)) {
          //do nothing! Since one coin of playerA was out of locker and it completed the Grid!
        } else if ((flagA === 1) && (numberOfCoinsCompletedA === 0)) {
          //one coin of PlayerA is out of locker and present on the grid
          autoMove(randomNumberA);
        } else if ((flagA === 2) && (numberOfCoinsCompletedA === 1)) {
          //both  the coins of playerA is out of the locker but one already completed the grid!
          autoMove(randomNumberA);
        } else if ((flagA === 2) && (numberOfCoinsCompletedA === 0)) {
          var once = (function() {
            var executed = false;
            return function() {
              if (!executed) {
                executed = true;
                alert("Both your coins are active" + " " + playerA + "! Click on the coin you intend to move!");
              }
            };
          })();

          once();
          clickToMove(randomNumberA);
        }
        chance = !chance; //Toggle the chance to playerB;
      } else if (randomNumberA === 6) {
        if (flagA === 0) {
          //None of the coins of playerA are out of locker!But playerA got 6 --> Release one  coin from A's locker!
          document.querySelector(".coin1A").classList.add("white"); //Disappear coin1A from locker!
          //Make the coin appear on the grid!
          // var startSquareA = document.querySelector("._" + startA);
          if (checkAvailability(listToArray(startSquareA.classList), ("colorB")) === true) { //If the starting square of playerA is preOccupied by a coin of playerB..
            startSquareA.classList.remove("colorB"); //Remove the playerB coin
            startSquareA.classList.add("colorA"); //Place the playerA's coin on the starting square for A
            sendBackToLocker(listToArray(startSquareA.classList)); //Send playerB's coin back to locker!
          } else { //If the start Square A  is empty,simply make the coin1A appear on that square
            startSquareA.classList.add("colorA");
          }
          //since now 1 coin of player A is active!
          flagA++;
          //Since A got a 6, he should get a chance again!
          return;
        } else if (flagA === 1) {
          if (numberOfCoinsCompletedA === 0) {
            start: do {
              var choiceFor2ndTokenA = prompt("Yor one coin is active " + playerA + "! You got a 6! Enter 1--Release 2nd coin   0--Move current coin");
              if (choiceFor2ndTokenA === '1') {
                flagA++; //Now both coins of A are out of locker!
                //Player A wants the second coin to be released using the 6 which he got!
                //Disappear coin2A of playerA from its locker!
                document.querySelector(".coin2A").classList.add("white");
                if (listToArray(startSquareA.classList).length > 2) { //if the start square of playerA is preoccupied
                  if (checkAvailability(listToArray(startSquareA.classList), ("colorA")) === true) { //preoccupied by A's own coin!
                    //do nothing!Will be handled in the click to move method!
                    break start;
                  } else if (checkAvailability(listToArray(startSquareA.classList), ("colorB")) === true) { //preoccupied by B's coin!
                    startSquareA.classList.remove("colorB"); //Remove the playerB coin
                    startSquareA.classList.add("colorA"); //Place the playerA's coin on the starting square for A
                    sendBackToLocker(listToArray(startSquareA.classList)); //Send playerB's coin back to locker!
                    break start; //As A got 6, he should get the chance again!
                  }
                } else { //the start square A is empty,simply make coin2A appear on it!
                  startSquareA.classList.add("colorA");
                  break start; //As A got 6, he should get the chance again!
                }

              } else if (choiceFor2ndTokenA === '0') {
                //A wants to move his current coin!
                autoMove(randomNumberA);
                break start;
              } else { //Value entered by A is not 0 or 1!
                alert("Please enter either 0 or 1 only!");
                continue start; //Keep asking A to enter 0 or 1 until he keeps entering wrong values!
              }
            } while (1);
          }
          else if (numberOfCoinsCompletedA === 1) {
            //One coin of A is out of locker and it has completed the grid also!-->No active coin!Hence, autorelease the remaining coin of A!
            //Make the coin appear on the grid!
            // var startSquareA = document.querySelector("._" + startA);
            if (checkAvailability(listToArray(startSquareA.classList), ("colorB")) === true) { //If the starting square of playerA is preOccupied by a coin of playerB..
              startSquareA.classList.remove("colorB"); //Remove the playerB coin
              startSquareA.classList.add("colorA"); //Place the playerA's coin on the starting square for A
              sendBackToLocker(listToArray(startSquareA.classList)); //Send playerB's coin back to locker!
            } else { //If the start Square A  is empty,simply make the coin1A appear on that square
              startSquareA.classList.add("colorA");
            }
            //since now 1 coin of player A is active!
            flagA++;
            //Since A got a 6, he should get a chance again!
            return;
          }
        } else if (flagA === 2) {
          if (numberOfCoinsCompletedA === 0) {
            //Both coins present on grid!
            clickToMove(randomNumberA);
            return; //As A got 6,he must get a chance again!
          } else if (numberOfCoinsCompletedA === 1) {
            //Both coins of A are out of locker,But only one is present on the grid!
            autoMove(randomNumberA);
            return; //Since A got a 6, he should get a chance again!
          }
        }
      }
    } else if (numberOfCoinsCompletedA === 2) {
      alert("Player A won the game!");
    }
  } else {
    alert("Not your Turn " + playerA + " !");
  }
}






function diceRollB() {
  if (chance === false) { //Player B's chance
    if (numberOfCoinsCompletedB < 2) { //check to ensure that atleast one coin of playerB has not completed the grid!
      randomNumberB = Math.floor(Math.random() * 6) + 1; //1-6
      randomDiceImageB = "dice" + randomNumberB + ".png"; //dice1.png - dice6.png
      var imgB = document.querySelectorAll("img")[1];

      imgB.setAttribute("src", randomDiceImageB);


      if (randomNumberB != 6) {
        if (flagB === 0) {
          //do nothing since no coin of PlayerA is out of the locker
        } else if ((flagB === 1) && (numberOfCoinsCompletedB === 1)) {
          //do nothing! Since one coin of playerB was out of locker and it completed the Grid!
        } else if ((flagB === 1) && (numberOfCoinsCompletedB === 0)) {
          //one coin of PlayerB is out of locker and present on the grid
          autoMove(randomNumberB);
        } else if ((flagB === 2) && (numberOfCoinsCompletedB === 1)) {
          //both  the coins of playerB is out of the locker but one already completed the grid!
          autoMove(randomNumberB);
        } else if ((flagB === 2) && (numberOfCoinsCompletedB === 0)) {
          var once = (function() {
            var executed = false;
            return function() {
              if (!executed) {
                executed = true;
                alert("Both your coins are active" + " " + playerB + "! Click on the coin you intend to move!");
              }
            };
          })();

          once();
          clickToMove(randomNumberB);
        }
        chance = !chance; //Toggle the chance to playerA;
      } else if (randomNumberB === 6) {
        if (flagB === 0) {
          //None of the coins of playerA are out of locker!But playerB got 6 --> Release one  coin from A's locker!
          document.querySelector(".coin1B").classList.add("white"); //Disappear coin1A from locker!
          //Make the coin appear on the grid!
          // var startSquareB = document.querySelector("._" + startB);
          if (checkAvailability(listToArray(startSquareB.classList), ("colorA")) === true) { //If the starting square of playerB is preOccupied by a coin of playerA..
            startSquareB.classList.remove("colorA"); //Remove the playerA coin
            startSquareB.classList.add("colorB"); //Place the playerB's coin on the starting square for B
            sendBackToLocker(listToArray(startSquareB.classList)); //Send playerA's coin back to locker!
          } else { //If the start Square B  is empty,simply make the coin1B appear on that square
            startSquareB.classList.add("colorB");
          }
          //since now 1 coin of player B is active!
          flagB++;
          //Since B got a 6, he should get a chance again!
          return;
        } else if (flagB === 1) {
          if (numberOfCoinsCompletedB === 0) {
            start: do {
              var choiceFor2ndTokenB = prompt("Yor one coin is active " + playerB + "! You got a 6! Enter 1--Release 2nd coin   0--Move current coin");
              if (choiceFor2ndTokenB === '1') {
                flagB++; //Now both coins of B are out of locker!
                //Player B wants the second coin to be released using the 6 which he got!
                //Disappear coin2B of playerB from its locker!
                document.querySelector(".coin2B").classList.add("white");
                if (listToArray(startSquareB.classList).length > 2) { //if the start square of playerB is preoccupied
                  if (checkAvailability(listToArray(startSquareB.classList), ("colorB")) === true) { //preoccupied by B's own coin!
                    //do nothing!Will be handled in the click to move method!
                    break start;
                  } else if (checkAvailability(listToArray(startSquareB.classList), ("colorA")) === true) { //preoccupied by A's coin!
                    startSquareB.classList.remove("colorA"); //Remove the playerA's coin
                    startSquareB.classList.add("colorB"); //Place the playerB's coin on the starting square for B
                    sendBackToLocker(listToArray(startSquareB.classList)); //Send playerA's coin back to locker!
                    break start; //As B got 6, he should get the chance again!
                  }
                } else { //the start square B is empty,simply make coin2B appear on it!
                  startSquareB.classList.add("colorB");
                  break start; //As B got 6, he should get the chance again!
                }

              } else if (choiceFor2ndTokenB === '0') {
                //B wants to move his current coin!
                autoMove(randomNumberB);
                break start;
              } else { //Value entered by B is not 0 or 1!
                alert("Please enter either 0 or 1 only!");
                continue start; //Keep asking B to enter 0 or 1 until he keeps entering wrong values!
              }
            } while (1);
          }
          else if (numberOfCoinsCompletedB === 1) {
            //One coin of B is out of locker and it has completed the grid also!-->No active coin!Hence, autorelease the remaining coin of B!
            //Make the coin appear on the grid!
            // var startSquareB = document.querySelector("._" + startB);
            if (checkAvailability(listToArray(startSquareB.classList), ("colorA")) === true) { //If the starting square of playerB is preOccupied by a coin of playerA..
              startSquareB.classList.remove("colorA"); //Remove the playerA's coin
              startSquareB.classList.add("colorB"); //Place the playerB's coin on the starting square for B
              sendBackToLocker(listToArray(startSquareB.classList)); //Send playerA's coin back to locker!
            } else { //If the start Square B  is empty,simply make the coin2B appear on that square
              startSquareB.classList.add("colorB");
            }
            //since now 1 coin of player B is active!
            flagB++;
            //Since B got a 6, he should get a chance again!
            return;
          }
        } else if (flagB === 2) {
          if (numberOfCoinsCompletedB === 0) {
            //Both coins present on grid!
            clickToMove(randomNumberB);
            return; //As B got 6,he must get a chance again!
          } else if (numberOfCoinsCompletedB === 1) {
            //Both coins of B are out of locker,But only one is present on the grid!
            autoMove(randomNumberB);
            return; //Since B got a 6, he should get a chance again!
          }
        }
      }
    } else if (numberOfCoinsCompletedB === 2) {
      alert("Player B won the game!");
    }
  } else {
    alert("Not your Turn " + playerB + " !");
  }
}
