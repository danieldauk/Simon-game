var corners = ["#upLeft", "#upRight", "#downLeft", "#downRight"];
var randomMoves = [];
var userMoves = [];
var movesCounter = 1;
var strictMode = 0;
var resetTimeout1;
var resetTimeout2;
var resetTimeout3;
var gameOn = 0;

$(function() {
  
  $("#counter").text("--");
  
  //generating random movess
  function generateRandomMoves() {
      randomMoves = [];
      
      for(var i =0; i<20; i++) {
        var randomNumber = Math.floor(Math.random()*4);
        randomMoves.push(corners[randomNumber]);
      }
    
  }
  
//starting game 
  
  function startGame() {
    showText();
   if(movesCounter<7) { 
      var patternSpeed = 1000;
    } else if(movesCounter>=7 && movesCounter<14) {
      var patternSpeed = 700;
    } else if ( movesCounter>=14) {
      var patternSpeed = 500;
    }
    setTimeout(function() {
      for(var i=0, delay=0; i<movesCounter; i++) {
        var corner = randomMoves[i];
        showPattern(corner, delay, i, patternSpeed);
        delay+=patternSpeed; 
      }
    }, 500);
    
    
  };
  
  //showing pattern
  function showPattern (move, delay, count, patternSpeed) {
    resetTimeout1 = setTimeout(function(){
    playSound(move);
    $(move).addClass("active");
      }, delay);
    resetTimeout2 = setTimeout(function(){
      $(move).removeClass("active");
      stopSound(move);
    }, delay+patternSpeed-200);
    if(count +1 == movesCounter) {
      resetTimeout3 = setTimeout(function(){
      playerMove();
    }, delay+patternSpeed-150);
    }
  }

  //putting player moves into array
  //binding and unbinding click event
  function playerMove() {
    userMoves = [];
    var currentMove = -1;
    $(".gamePart").on("mousedown", function() {
      $(this).addClass("active");
      var moveId = $(this).attr("id");
      var moveId = "#" +moveId;
      playSound(moveId);
    });
    $(".gamePart").on("mouseleave mouseup",function(){
      var moveId = $(this).attr("id");
      var moveId = "#" +moveId;
      stopSound(moveId);
      $(this).removeClass("active");
    });
  

    $(".gamePart").on("click", function() {
      currentMove++;
      var move = $(this).attr("id");
      userMoves.push(move);
      
      //if player wins the game
      
      //if current input is not as randomPattern
      if("#" + userMoves[currentMove] != randomMoves[currentMove]) {
        //if strict mode is on
        if(strictMode == 1) {
          //error message and delayer start from beginning
          $(".gamePart").off();
          showError();
        } else {
          $(".gamePart").off();
            showError();
        }
      //if all moves were correct
      } else if(userMoves.length == movesCounter && movesCounter == 20) {
         showWin();
      } else if(userMoves.length == movesCounter ) {
          $(".gamePart").off();
          movesCounter++;
          startGame();
      }
    });
        
  };
  
  //show error function
  function showError() {
    var intervalCounter = 0;
    var delay = 0;
    $("#counter").text("!!");
    while(intervalCounter <3) {
      intervalCounter++;
      setTimeout(function() {
        playSound("error");
        $("#counter").text("");
      },delay+300);
      setTimeout(function() {
        $("#counter").text("!!");
        stopSound("error");
      },delay+600);
      delay+=500;
    };  
    
    if(strictMode == 1) {
      setTimeout(function() {
        generateRandomMoves();
        restartGame();
        startGame();
      },delay+500); 
    } else {
      setTimeout(function() {
        startGame();
      },delay+500); 
    }
    
  }

  
   var audio1 = new Audio("audio/1.wav");
  var audio2 = new Audio("audio/2.wav");
  var audio3 = new Audio("audio/3.wav");
  var audio4 = new Audio("audio/4.wav");
  var audioError = new Audio("audio/error.wav");
  var audioWin = new Audio("audio/win.mp3");
  
  
  // play and stop audio functions 
  
  
  function playSound(move) {
    
    if(move =="#upLeft") {
      audio1.play();
    } else if(move =="#upRight") {
      audio2.play();
    } else if(move =="#downLeft") {
      audio3.play();
    } else if(move =="#downRight") {
      audio4.play();
    } else if(move =="error") {
      audioError.play();
    } else if(move =="win") {
      audioWin.play();
    }
  }
  
  function stopSound(move) {
    if(move =="#upLeft") {
      audio1.pause();
      audio1.currentTime = 0;
    } else if(move =="#upRight") {
      audio2.pause();
      audio2.currentTime = 0
    } else if(move =="#downLeft") {
      audio3.pause();
      audio3.currentTime = 0
    } else if(move =="#downRight") {
      audio4.pause();
      audio4.currentTime = 0
    } else if(move =="error") {
      audioError.pause();
      audioError.currentTime = 0
    }
  }
  
  
  //restart function 
  
  function restartGame() {
    clearTimeout(resetTimeout1);
    clearTimeout(resetTimeout2);
    clearTimeout(resetTimeout3);
    stopSound("#upLeft");
    stopSound("#upRight");
    stopSound("#downLeft");
    stopSound("#downRight");
    $(".gamePart").removeClass("active");
    $(".gamePart").off();
    movesCounter = 1;
  }
  
  //show win message
  
  function showWin() {
     $(".gamePart").off();
      var intervalCounter = 0;
      var delay = 0;
    $("#counter").text("WIN");
    while(intervalCounter <12) {
      intervalCounter++;
      setTimeout(function() {
        playSound("win");
        $("#counter").text("");
      },delay+300);
      setTimeout(function() {
        $("#counter").text("WIN");
        stopSound("win");
        
      },delay+600);
      delay+=500;
    }
    
    setTimeout(function() {
        generateRandomMoves();
        restartGame();
        startGame();
      },delay+500); 
  }
    /*show text on screen*/
  function showText() {
    if(movesCounter<10) {
      $("#counter").text("0"+ movesCounter);
    } else {
      $("#counter").text(movesCounter);
    }
  };
  
  /*buttons*/
   
  $("#restart").on("click", function() {
    if(gameOn !=0) {
      restartGame();
      startGame();
    }
  });
  
 $("#start").on("click", function() {
   if(gameOn == 0) {
     //turning on screen
     $("#counter").css({
       "text-shadow": "0px 0px 8px rgba(247,57,85, 0.8)",
        "color": "rgba(247,57,85,1)",
        "font-size": "25px"
     });
     
     
     gameOn = 1;
     generateRandomMoves();
     restartGame();
     startGame();
     
     //on/off button light
     $(".fa-power-off").css({
      "filter": "invert(100%)",
      "text-shadow": "0px 0px 8px rgba(0,0,0, 0.6)"
     });
   } else {
     //turning off screen
     $("#counter").css({
        "text-shadow": "none",
        "color": "rgba(247,57,85,0.3)",
        "font-size": "30px"
     });
     
     //on/off button light
     $(".fa-power-off").css({
      "filter": "none",
      "text-shadow": "none"
     });
     
     gameOn = 0;
     restartGame();
     $("#counter").text("--");
   }
  });
  
  $("#strict").on("click", function() {
    if(strictMode == 0) {
      strictMode = 1;
      $("#led").css({
        "background": "rgba(247,57,85,1)",
        "-webkit-box-shadow": "0px 0px 5px 1px rgba(247,57,85,0.5)",
        "-moz-box-shadow": "0px 0px 5px 1px rgba(247,57,85,0.5)",
  "box-shadow": "0px 0px 5px 1px rgba(247,57,85,0.5)"
      });
    } else {
      strictMode = 0;
      $("#led").css({
        "background": "rgba(50,78,92,1)",
        "box-shadow": "none"
      });
    }
  });
  
  $(".menuBtn").on("mousedown", function(){
    $(this).addClass("clicked");
  });
  
  $(".menuBtn").on("mouseup mouseleave", function(){
    $(this).removeClass("clicked");
  });
  
  
});