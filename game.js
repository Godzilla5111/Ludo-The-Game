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

var playerARoll = $("turnA");
var playerBRoll = $("turnB");

var chance = true;

//Convert list to array function!
function listToArray(list) {
  var arr = [];
  for (var node = list; node; node = node.rest) {
    arr.unshift(node.value);

  }
  return arr[0].split(" ");
}





function highlightCoinsA() {
  var cellsContainingCoinA = $(".cell").has('.coinA');
  cellsContainingCoinA.each(function() {
    $(this).addClass("shadowA");
  });
}




function highlightCoinsB() {
  var cellsContainingCoinB = $(".cell").has('.coinB');
  cellsContainingCoinB.each(function() {
    $(this).addClass("shadowB");
  });
}




function autoMove(num) {
  if (chance === true)

  {
    if ((flagA === 1 && numberOfCoinsCompletedA === 0) || (flagA === 2 && numberOfCoinsCompletedA === 1)) {
      var coinAToBeMoved = $(".cell").has(".coinA");
      var idOfCoinAToBeMoved;
      coinAToBeMoved.each(function() {
        idOfCoinAToBeMoved = $(this).attr("id");
      });

      var startPositionA = parseInt(idOfCoinAToBeMoved.replace(/^\D+/g, ''));

      $("#" + idOfCoinAToBeMoved).empty();
      var nextPositionA = startPositionA + num;
      if (nextPositionA < gridOrder.length) {

        var targetStringNextA = "#_" + nextPositionA + ">div";


        if ($(targetStringNextA).length === 0) {
          $("#_" + nextPositionA).append("<div class='coinA'></div>");
        } else if ($(targetStringNextA).length === 1) {
          // if there is one token present on the next position A
          if ($("#_" + nextPositionA).has(".coinB").length) { //If that's B's token!

            $("#_" + nextPositionA).empty(); //Kick the token
            // $(".coin1B").show();
            $("#_" + nextPositionA).append("<div class='coinA'></div>");
            if (flagB === 1) {
              if (numberOfCoinsCompletedB === 0) { //If it was the B's only active token!
                $(".coin1B").show(); //Make it reapppear on its locker!
                flagB--;
              }
            }
            if (flagB === 2) { //If two tokens of B are out of the locker, doesn't matter how many completed!
              $(".coin2B").show();
              flagB--;
            }
          }
        } else if ($(targetStringNextA).length === 2) { //If the start position of A is occupied by two coins of B!
          $("#_" + nextPositionA).empty(); //Kick both the coins
          $("#_" + nextPositionA).append("<div class='coinA'></div>"); //Add A's coin!
          $(".coin1B").show(); //Send them back to their locker!Make them reappear!
          $(".coin2B").show();
          flagB -= 2;
        }




      } else {
        alert("Coin Completed Player A!");
        numberOfCoinsCompletedA++;
      }
    }
  }




  if (chance === false)

  {
    if ((flagB === 1 && numberOfCoinsCompletedB === 0) || (flagB === 2 && numberOfCoinsCompletedB === 1)) {
      console.log("hi");
      var coinBToBeMoved = $(".cell").has(".coinB");
      var idOfCoinBToBeMoved;
      coinBToBeMoved.each(function() {
        idOfCoinBToBeMoved = $(this).attr("id");
      });

      var startPositionB = orderB.indexOf(parseInt(idOfCoinBToBeMoved.replace(/^\D+/g, '')));

      console.log(startPositionB);
      $("#" + idOfCoinBToBeMoved).empty();
      var nextPositionB = startPositionB + num;
      if (nextPositionB < gridOrder.length - 1) {

        var targetStringNextB = "#_" + orderB[nextPositionB] + ">div";


        if ($(targetStringNextB).length === 0) {
          $("#_" + orderB[nextPositionB]).append("<div class='coinB'></div>");
        } else if ($(targetStringNextB).length === 1) {
          // if there is one token present on the next position B
          if ($("#_" + orderB[nextPositionB]).has(".coinA").length) { //If that's A's token!

            $("#_" + orderB[nextPositionB]).empty(); //Kick the token
            // $(".coin1A").show();
            $("#_" + orderB[nextPositionB]).append("<div class='coinB'></div>");
            if (flagA === 1) {
              if (numberOfCoinsCompletedA === 0) { //If it was the A's only active token!
                $(".coin1A").show(); //Make it reapppear on its locker!
                flagA--;
              }
            }
            if (flagA === 2) { //If two tokens of A are out of the locker, doesn't matter how many completed!
              $(".coin2A").show();
              flagA--;
            }
          }
        } else if ($(targetStringNextB).length === 2) { //If the start position of B is occupied by two coins of A!
          $("#_" + orderB[nextPositionB]).empty(); //Kick both the coins
          $("#_" + orderB[nextPositionB]).append("<div class='coinB'></div>"); //Add B's coin!
          $(".coin1A").show(); //Send them back to their locker!Make them reappear!
          $(".coin2A").show();
          flagA -= 2;
        }




      } else {
        alert("Coin Completed Player B!");
        numberOfCoinsCompletedB++;
      }
    }
  }



}





//
//
//
function diceRollA() {

  if (chance === true) {

    if (numberOfCoinsCompletedB < 2) { //check to ensure that atleast one coin of playerA has not completed the grid!
      randomNumberA = Math.floor(Math.random() * 6) + 1; //1-6
      randomDiceImageA = "dice" + randomNumberA + ".png"; //dice1.png - dice6.png

      var imgA = $("#dicepPlayerA");
      $("#dicepPlayerA").fadeOut();
      $("#dicepPlayerA").fadeIn();
      imgA.attr("src", randomDiceImageA);



      if (randomNumberA !== 6) {
        if (flagA === 0) {
          //do nothing!
        } else if (flagA === 1) {
          if (numberOfCoinsCompletedA === 0) {
            autoMove(randomNumberA);
          } else if (numberOfCoinsCompletedA === 1) {
            //do nothing
          }

        } else if (flagA === 2) {
          if (numberOfCoinsCompletedA === 0) {
            highlightCoinsA();
            document.querySelectorAll(".coinA").forEach((coinA, i) => {
              coinA.style.cursor = "pointer";
            });

            //click to move
          } else if (numberOfCoinsCompletedA === 1) {
            autoMove(randomNumberA);
          }
        }
        chance = !chance;
        $("#buttonB").show();
        $("#buttonA").hide();
      } else if (randomNumberA === 6) {
        if (flagA === 0) {
          $(".coin1A").hide();
          if ($("#_1>div").length === 0) {
            $("#_1").html("<div class='coinA'></div>"); //If startA position is empty, go on and add the A's coin!
          } else if ($('#_1>div').length !== 0) { //If startPosition A is non-empty!
            if ($("#_1>div").length === 1) { //if there is one token present on the starting position A
              if ($("#_1").has(".coinB").length) { //If that's B's token/s!

                $("#_1").empty(); //Kick the token/s
                $(".coin1B").show();
                $("#_1").append("<div class='coinA'></div>");
                if (flagB === 1) {
                  if (numberOfCoinsCompletedB === 0) { //If it was the B's only active token!
                    $(".coin1B").show(); //Make it reapppear on its locker!
                    flagB--;
                  }
                }
                if (flagB === 2) { //If two tokens of B are out of the locker, doesn't matter how many completed!
                  $(".coin2B").show();
                  flagB--;
                }
              }
            } else if ($("#_1>div").length === 2) { //If the start position of A is occupied by two coins of B!
              $("#_1").empty(); //Kick both the coins
              $("#_1").append("<div class='coinA'></div>"); //Add A's coin!
              $(".coin1B").show(); //Send them back to their locker!Make them reappear!
              $(".coin2B").show();
              flagB -= 2;
            }
          }
          flagA++;
          chance = !chance;
          $("#buttonB").show();
          $("#buttonA").hide();
          return;
        } else if (flagA === 1) {
          if (numberOfCoinsCompletedA === 0) {



            start: do {
              var choiceFor2ndTokenA = prompt("Yor one coin is active playerA! You got a 6! Enter 1--Release 2nd coin   0--Move current coin");
              if (choiceFor2ndTokenA === '1') {

                flagA++; //Now both coins of A are out of locker!
                //Player A wants the second coin to be released using the 6 which he got!
                //Disappear coin2A of playerA from its locker!
                $(".lockerA>.coinA").hide();



                if ($("#_1>div").length === 0) {
                  $("#_1").html("<div class='coinA'></div>"); //If startA position is empty, go on and add the A's coin!
                } else if ($("#_1>div").length !== 0) { //If startPosition A is non-empty!


                  if ($("#_1>div").length === 1) { //if there is one token present on the starting position A

                    if ($("#_1").has(".coinB").length) { //If that's B's token/s!
                      $("#_1").empty(); //Kick the token/s
                      $("#_1").append("<div class='coinA'></div>");
                      if (flagB === 1) {
                        if (numberOfCoinsCompletedB === 0) { //If it was the B's only active token!
                          $(".coin1B").show(); //Make it reapppear on its locker!
                          flagB--;
                        }
                      }
                      if (flagB === 2) { //If two tokens of B are out of the locker, doesn't matter how many completed!
                        $(".coin2B").show();
                        flagB--;
                      }
                    } else if ($("#_1").has(".coinA").length) { //preoccupied by A's own coin!

                      $("#_1").append("<div class='coinA'></div>");
                    }
                  }
                } else if ($("#_1>div").length === 2) { //If the start position of A is occupied by two coins of B!
                  $("#_1").empty(); //Kick both the coins
                  $("#_1").append("<div class='coinA'></div>"); //Add A's coin!
                  $(".coin1B").show(); //Send them back to their locker!Make them reappear!
                  $(".coin2B").show();
                  flagB -= 2;
                }


                break start;


              } else if (choiceFor2ndTokenA === '0') {
                //A wants to move his current coin!
                autoMove(randomNumberA);
                break start;
              } else { //Value entered by A is not 0 or 1!
                alert("Please enter either 0 or 1 only!");
                continue start; //Keep asking A to enter 0 or 1 until he keeps entering wrong values!
              }
            } while (1);









            chance = !chance;
            $("#buttonB").show();
            $("#buttonA").hide();
            return;
          }
          else if (numberOfCoinsCompletedA === 1) {
            $(".coin2A").hide();
            flagA++;
            $("#_1").html("<div class='coinA'></div>");
            chance = !chance;
            $("#buttonB").show();
            $("#buttonA").hide();
            return;
          }
        } else if (flagA === 2) {
          if (numberOfCoinsCompletedA === 0) {
            highlightCoinsA();
            document.querySelectorAll(".coinA").forEach((coinA, i) => {
              coinA.style.cursor = "pointer";
            });
            //click to move
            chance = !chance;
            $("#buttonB").show();
            $("#buttonA").hide();
            return;
          } else if (numberOfCoinsCompletedA === 1) {
            autoMove(randomNumberA);
            chance = !chance;
            $("#buttonB").show();
            $("#buttonA").hide();
            return;
          }
        }





      }
    } else {
      alert("PlayerB won the game!");
    }
  }
}









function diceRollB() {

  if (chance === false) {

    if (numberOfCoinsCompletedA < 2) { //check to ensure that atleast one coin of playerA has not completed the grid!
      randomNumberB = Math.floor(Math.random() * 6) + 1; //1-6
      randomDiceImageB = "dice" + randomNumberB + ".png"; //dice1.png - dice6.png

      var imgB = $("#dicepPlayerB");
      $("#dicepPlayerB").fadeOut();
      $("#dicepPlayerB").fadeIn();
      imgB.attr("src", randomDiceImageB);



      if (randomNumberB !== 6) {
        if (flagB === 0) {
          //do nothing!
        } else if (flagB === 1) {
          if (numberOfCoinsCompletedB === 0) {
            autoMove(randomNumberB);
          } else if (numberOfCoinsCompletedB === 1) {
            //do nothing
          }

        } else if (flagB === 2) {
          if (numberOfCoinsCompletedB === 0) {
            highlightCoinsB();
            document.querySelectorAll(".coinB").forEach((coinB, i) => {
              coinB.style.cursor = "pointer";
            });

            //click to move
          } else if (numberOfCoinsCompletedB === 1) {
            console.log("hi");
            autoMove(randomNumberB);
          }
        }
        chance = !chance;
        $("#buttonA").show();
        $("#buttonB").hide();
      } else if (randomNumberB === 6) {
        if (flagB === 0) {
          $(".coin1B").hide();
          if ($("#_15>div").length === 0) {
            $("#_15").html("<div class='coinB'></div>"); //If startB position is empty, go on and add the B's coin!
          } else if ($('#_15>div').length !== 0) { //If startPosition B is non-empty!
            if ($("#_15>div").length === 1) { //if there is one token present on the starting position B
              if ($("#_15").has(".coinA").length) { //If that's A's token/s!

                $("#_15").empty(); //Kick the token
                $(".coin1A").show();
                $("#_15").append("<div class='coinB'></div>");
                if (flagA === 1) {
                  if (numberOfCoinsCompletedA === 0) { //If it was the A's only active token!
                    $(".coin1A").show(); //Make it reapppear on its locker!
                    flagA--;
                  }
                }
                if (flagA === 2) { //If two tokens of A are out of the locker, doesn't matter how many completed!
                  $(".coin2A").show();
                  flagA--;
                }
              }
            } else if ($("#_15>div").length === 2) { //If the start position of B is occupied by two coins of A!
              $("#_15").empty(); //Kick both the coins
              $("#_15").append("<div class='coinB'></div>"); //Add B's coin!
              $(".coin1A").show(); //Send them back to their locker!Make them reappear!
              $(".coin2A").show();
              flagA -= 2;
            }
          }
          flagB++;
          chance = !chance;
          $("#buttonA").show();
          $("#buttonB").hide();
          return;
        } else if (flagB === 1) {
          if (numberOfCoinsCompletedB === 0) {



            start: do {
              var choiceFor2ndTokenB = prompt("Yor one coin is active playerB! You got a 6! Enter 1--Release 2nd coin   0--Move current coin");
              if (choiceFor2ndTokenB === '1') {

                flagB++; //Now both coins of B are out of locker!
                //Player B wants the second coin to be released using the 6 which he got!
                //Disappear coin2A of playerA from its locker!
                $(".lockerB>.coinB").hide();



                if ($("#_15>div").length === 0) {
                  $("#_15").html("<div class='coinB'></div>"); //If startB position is empty, go on and add the B's coin!
                } else if ($("#_15>div").length !== 0) { //If startPosition B is non-empty!


                  if ($("#_15>div").length === 1) { //if there is one token present on the starting position B

                    if ($("#_15").has(".coinA").length) { //If that's A's token/s!
                      $("#_15").empty(); //Kick the token
                      $("#_15").append("<div class='coinB'></div>");
                      if (flagB === 1) {
                        if (numberOfCoinsCompletedA === 0) { //If it was the A's only active token!
                          $(".coin1A").show(); //Make it reapppear on its locker!
                          flagA--;
                        }
                      }
                      if (flagA === 2) { //If two tokens of A are out of the locker, doesn't matter how many completed!
                        $(".coin2A").show();
                        flagA--;
                      }
                    } else if ($("#_15").has(".coinB").length) { //preoccupied by B's own coin!

                      $("#_15").append("<div class='coinB'></div>");
                    }
                  }
                } else if ($("#_15>div").length === 2) { //If the start position of B is occupied by two coins of B!
                  $("#_15").empty(); //Kick both the coins
                  $("#_15").append("<div class='coinB'></div>"); //Add B's coin!
                  $(".coin1A").show(); //Send them back to their locker!Make them reappear!
                  $(".coin2A").show();
                  flagA -= 2;
                }


                break start;


              } else if (choiceFor2ndTokenB === '0') {
                //B wants to move his current coin!
                autoMove(randomNumberB);
                break start;
              } else { //Value entered by B is not 0 or 1!
                alert("Please enter either 0 or 1 only!");
                continue start; //Keep asking B to enter 0 or 1 until he keeps entering wrong values!
              }
            } while (1);









            chance = !chance;
            $("#buttonA").show();
            $("#buttonB").hide();
            return;
          }
          else if (numberOfCoinsCompletedB === 1) {
            $(".coin2B").hide();
            flagB++;
            $("#_15").html("<div class='coinB'></div>");
            chance = !chance;
            $("#buttonA").show();
            $("#buttonB").hide();
            return;
          }
        } else if (flagB === 2) {
          if (numberOfCoinsCompletedB === 0) {
            highlightCoinsB();
            document.querySelectorAll(".coinB").forEach((coinB, i) => {
              coinB.style.cursor = "pointer";
            });
            //click to move
            chance = !chance;
            $("#buttonA").show();
            $("#buttonB").hide();
            return;
          } else if (numberOfCoinsCompletedB === 1) {
            autoMove(randomNumberB);
            chance = !chance;
            $("#buttonA").show();
            $("#buttonB").hide();
            return;
          }
        }





      }
    } else {
      alert("PlayerA won the game!");
    }
  }
}
