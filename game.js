var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

// Computer picks a square
function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    // Everytime nextSequence() is called remove the previous array of choices to restart the comparison in checkAnswer()
    userClickedPattern = [];

    // Step 2 Code

    var randomNumber = Math.random();       

    randomNumber *= 4;

    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    // Step 3 Code
    $("#" + randomChosenColor).fadeOut().fadeToggle();

    playSound(randomChosenColor);

}
    // Step 5 Code
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

    // Step 7 Code
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Step 8 Code
function checkAnswer(currentLevel) {

    // if correct choice
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    // if wrong choice
    else {

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        if (document.addEventListener("keypress", function () {
            setTimeout(function () {
            }, 100);
        })) {}

        startOver();
    }
}

// Step 10 Code
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

// Step 7 Code
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

// Game starts here / Step 7 Code
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});