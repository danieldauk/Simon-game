var corners = ["#upLeft", "#upRight", "#downLeft", "#downRight"];
var randomMoves = [];
var userMoves = [];
var movesCounter = 5;

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
    for(var i=0, delay=0; i<movesCounter; i++) {
      var corner = randomMoves[i];
      showPattern(corner, delay);
      delay+=1000;
    }
    //playerMove();
    
  };
  
  //showing pattern
  function showPattern (move, delay) {
    setTimeout(function(){
    $(move).addClass("active");
      }, delay);
    setTimeout(function(){
      $(move).removeClass("active");
    }, delay+800);
  }

  //putting player moves into array
  //binding and unbinding click event
  function playerMove() {
    userMoves = [];
    var currentMove = -1;
    $(".gamePart").on("click", function() {
      currentMove++;
      var move = $(this).attr("id");
      userMoves.push(move);
      
      if(userMoves[currentMove] != randomMoves[currentMove]) {
        //error start over or strict?
      } else if(/*function check for*/) {
        movesCounter++;
        startGame();
      } else {
        //wrong user pattern
        $(".gamePart").off("click");
        //repeat?
      }
        
    });
    
  };
  

//compare user pattern and random pattern
  function comparePatterns () {
    var currentRandomPattern = randomMoves.slice(0, movesCounter);
    
    for(var i = 0; i<randomMoves.length; i++) {
      if(currentRandomPattern[i] != userMoves[i]) {
        // return error: start over? strict?
      }
    }
  };


  
});