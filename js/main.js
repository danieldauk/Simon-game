var corners = ["#upLeft", "#upRight", "#downLeft", "#downRight"];
var randomMoves = [];
var userMoves = [];
var movesCounter = 2;
var stricMode = 0;

$(function() {
    generateRandomMoves();
  //generating random movess
  function generateRandomMoves() {
      randomMoves = [];
      
      for(var i =0; i<20; i++) {
        var randomNumber = Math.floor(Math.random()*4);
        randomMoves.push(corners[randomNumber]);
      }
    
  }
  
//starting game 
  
    startGame();
  function startGame() {
    console.log("started");
    for(var i=0, delay=0; i<movesCounter; i++) {
      var corner = randomMoves[i];
      showPattern(corner, delay, i);
      delay+=1000;
    }
    
  };
  
  //showing pattern
  function showPattern (move, delay, count) {
    setTimeout(function(){
    $(move).addClass("active");
      }, delay);
    setTimeout(function(){
      $(move).removeClass("active");
    }, delay+800);
    if(count +1 == movesCounter) {
      setTimeout(function(){
      playerMove();
    }, delay+900);
    }
  }

  //putting player moves into array
  //binding and unbinding click event
  function playerMove() {
    userMoves = [];
    var currentMove = -1;
    $(".gamePart").on("mousedown", function() {
      $(this).addClass("active");
    });
    $(".gamePart").on("mouseleave mouseup",function(){
      $(this).removeClass("active");
    });
  

    $(".gamePart").on("click", function() {
      currentMove++;
      var move = $(this).attr("id");
      userMoves.push(move);
      
      //if current input is not as randomPattern
      if("#" + userMoves[currentMove] != randomMoves[currentMove]) {
        //if strict mode is on
        if(strictMode = 1) {
          $(".gamePart").off();
          $("body").css("background-color", "red");
          movesCounter = 1;
          startGame();
        } else {
          $(".gamePart").off();
          $("body").css("background-color", "red");
          startGame();
        }
      //if all moves were correct
      } else if(userMoves.length == movesCounter) {
          $(".gamePart").off();
          movesCounter++;
          startGame();
      }
    });
    
  };
  


  
});