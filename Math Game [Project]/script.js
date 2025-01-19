var playing = false;
var score;
var action;
var timeRemain;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startReset").onclick = function(){
    //if we are playing
 if(playing == true) {
    location.reload();
 }
 else { //if we are not playing
    //change to playing mode
    playing = true;
    //set score to zero
    score = 0;
    document.getElementById("scoreValue").innerHTML = score;
    //show countdown box
    show("timeRemain");
    timeRemain = 60;
    document.getElementById("timeRemainVal").innerHTML = timeRemain;
    //hide game over box
    hide("gameOver");
    //change button to reset
    document.getElementById("startReset").innerHTML = "Reset Game";
    //start countdown
    startCountdown();
    //generate questions
    generateQA();
  } 
}

//clicking on an answer
for(i=1; i<5; i++)
{
document.getElementById("box"+ i).onclick = function()
 {
    //check if we are playing
    if(playing == true)
        {
        if(this.innerHTML == correctAnswer)
            {
            //correct answer
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            //hide wrong box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);

            //generate a new question
            generateQA();
        }
        else
        {
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
 }
}

//functions
//start countdown

function startCountdown(){
    action = setInterval(function(){
        timeRemain -= 1;
    document.getElementById("timeRemainVal").innerHTML = timeRemain;
     if(timeRemain == 0){ //game over
        stopCountdown();
        show("gameOver");
        document.getElementById("gameOver").innerHTML = "<p>GAME OVER!</p><p>Your Score is " + score + ".</p>";
        hide("timeRemain");
        hide("correct");
        hide("wrong");
        playing = false;
        document.getElementById("startReset").innerHTML = "Start Game";
     }
    }, 1000);
}

//stop the counter
function stopCountdown(){
    clearInterval(action);
}

//hides elements
function hide(id){
    document.getElementById(id).style.display = "none";
}

//display elements on screen
function show(id){
    document.getElementById(id).style.display = "block";
}

//Generate Questions and multiple answers
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctPos = 1 + Math.round(3*Math.random());
    document.getElementById("box"+ correctPos).innerHTML = correctAnswer;//fill one box with the correct answer

    var answers = [correctAnswer];

    //fill boxes with wrong answers
    for(i = 1; i < 5; i++){
       if(i != correctPos){
        var wrongAnswer; 
        do{
            wrongAnswer = (1+ Math.round(9*Math.random()) * 1+ Math.round(9*Math.random()));//generates wrong answer
            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
        while(answers.indexOf(wrongAnswer) > -1);
        document.getElementById("box"+i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
       }
    }
}
