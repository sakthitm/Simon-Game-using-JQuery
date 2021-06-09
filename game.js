var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started = false;

//checking if any key was pressed
$(document).keypress(function(){
  if(!started)
  {
      $("#level-title").text("Level "+ level);
      nextSequence();
      started = true;
  }
});

//checking which button was clicked
$(".btn").click(function(){
    var userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    playsound(userClickedColor);
    animatePress(userClickedColor);
    checkAnswer(userClickedPattern.length-1);
});

//check if user presses correct coloured button
function checkAnswer(currentLevel){

//to check if users last entered color is same as in game pattern
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");

    //to check if user has completed the pattern
    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function(){
          nextSequence();
        },1000);
    }
  }
  else{
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    startOver();
  }
}
//generate next sequence
function nextSequence(){
  userClickedPattern=[];
  level++;

  $("#level-title").text("Level "+level);

  //random number generation
  var randomNumber = Math.round(Math.random()*3);

  //adding a randomly chosen color to gamePattern
  var randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);

  //flash colour animation
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playsound
  playsound(randomChosenColor);
  animatePress(randomChosenColor);
}

//playsound
function playsound(valueName){
  var audio = new Audio("sounds/"+valueName+".mp3");
  audio.play();
}

//pressed animation
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//Restart game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
