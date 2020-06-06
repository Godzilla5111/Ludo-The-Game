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


function autoMove(num){

}






$(".locker>.coin1B").hide();
$("#_1").html("<div class='coinB'></div><div class='coinB'></div>");



function diceRollA() {
  if (chance === true) {
    // $("#buttonA").hide();
    $("#buttonB").fadeOut();
    if (numberOfCoinsCompletedA < 2) { //check to ensure that atleast one coin of playerA has not completed the grid!
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
            //autoMove
          } else if (numberOfCoinsCompletedA === 1) {
            //do nothing
          }

        } else if (flagA === 2) {
          if (numberOfCoinsCompletedA === 0) {
            highlightCoinsA();
            $(".coinA".css("cursor","pointer"));
            //click to move
          } else if (numberOfCoinsCompletedA === 1) {
            //automove;
          }
        }
        // chance = !chance;
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
                    flag--;
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
          // chance = !chance;
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
                $("td>.coinA").css("cursor","pointer");
                // $("#_1").append("<div class='coinA'></div>");




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
                          flag--;
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
                //automove
                break start;
              } else { //Value entered by A is not 0 or 1!
                alert("Please enter either 0 or 1 only!");
                continue start; //Keep asking A to enter 0 or 1 until he keeps entering wrong values!
              }
            } while (1);









            // chance= !chance;
            return;
          }
          else if (numberOfCoinsCompletedA === 1) {
            $(".coin2A").hide();
            flagA++;
            $("#_1").html("<div class='coinA'></div>");
            // chance = !chance;
            return;
          }
        } else if (flagA === 2) {
          if (numberOfCoinsCompletedA === 0) {
            highlightCoinsA();
            //click to move
            chance = !chance;
            return;
          } else if (numberOfCoinsCompletedA === 1) {
            //autoMove
            // chance  = !chance;
            return;
          }
        }





      } else {
        alert("Player A won the game!");
      }
    } else {
      alert("Not your turn PlayerA!");
    }
  }
}



function diceRollB() {

}
