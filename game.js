// Declaration section
var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickpattern = [];
var started = false;
var level = 0;

// Heading Section
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
// Move to next level and step-3
function nextSequence() {
    userclickpattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var RandomChosenColor = buttonColors[randomNumber];
    gamepattern.push(RandomChosenColor);

    $("#" + RandomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    // step-5
    playSound(RandomChosenColor);
}
// step-4 user choosen button
$(".btn").click(function() {

    var UserChosenColor = $(this).attr("id");
    userclickpattern.push(UserChosenColor);

    playSound(UserChosenColor);
    animatePress(UserChosenColor);

    CheckingAnswer(userclickpattern.length - 1);
});
// verify Section
function CheckingAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userclickpattern[currentLevel]) {
        if (userclickpattern.length === gamepattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// Sound Section
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Clicking Animation Section
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Gameover Section
function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}