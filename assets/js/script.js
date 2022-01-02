// ARRAY of QUIZ QUESTIONS
var questions = [
    // q 1
    {
        questionText:"Which of the follow is not a JavaScript Data Type?",
        options:["a. Number", "b. Undefined", "c. Boolean", "d. Float"],
        answer:"d. Float"
    },
    // q 2 
    {
        questionText:"Inside which HTML element do we put the JavaScript?",
        options:["a. <script>", "b. <head>", "c. <javascript>", "d. <style>"],
        answer:"a. <script>"
    },
    // q 3
    {
        questionText:"JavaScript ignores...",
        options:["a. Spaces", "b. Tabs", "c. Newlines", "d. All of the above"],
        answer:"d. All of the above"
    },
    // q 4 
    {
        questionText:"Which symbol is used for comments in JavaScript?",
        options:["a. \\", "b. #", "c. //", "d. \* */"],
        answer:"c. //"
    },
    // q 5
    {
        questionText:"Arrays in JavaScript can be used to store _____.",
        options: ["a. Numbers and Strings", "b. Other Arrays", "c. Objects", "d. All of the above"],
        answer: "d. All of the above"
    }
];

// initialize variables 
var score = 0;
var quizOver = false;
var time_remaining = 121;

// Reference variables to html 
var questionContentEl = document.querySelector("#questions-list");
var startBtn = document.querySelector("#start-btn")


// function to start timer/quiz


var startQuiz = function(){
    displayQuestion();
    countdownTimer();
};

document.querySelector("#start-btn").addEventListener("click", startQuiz);

// create function to display quiz questions 

var displayQuestion = function(){
    let currentQuestion = 0;
    let question = questions[currentQuestion];
    let answerOptions = question.options;

    let questionEl = document.querySelector("#question-text");
    questionEl.textContent = question.questionText;

    for (var i = 0; i < answerOptions.length; i++){
        let answerChoice = answerOptions[i];
        let answerBtn = document.querySelector("#option"+i);
        answerBtn.textContent = answerChoice;
    }   
}



// determine if content for selected button and correct answer is the same 
var correctAnswer = function(answerBtn){
    return answerBtn.textContent === questions[currentQuestion].answer;
}

// check to see if answer selected is correct
var checkAnswer = function(event){
    let answerBtn = event.target; 
    // correct answer increases the score 
    if (correctAnswer(answerBtn)){
        score = score + 20;
    }
    // incorrect answer decreases the time remaining 
    else {
        if (time_remaining > 10){
            time_remaining = time_remaining - 10;
       }
       else{
           time_remaining = 0;
           endQuiz();
       }
    }

    // go on to next question 
    currentQuestion++;

    // if there are no more questions, end quiz
    if (currentQuestion < questions.length){
        displayQuestion();
    }
    else{
        endQuiz();
    }
}

document.querySelector("#answer-options").addEventListener("click", checkAnswer)

// create a countdown function for the timer

var countdownTimer = function(){
    time_remaining--;
    if (time_remaining < 0) {
        endQuiz();
    }
    let timerDisplay = document.querySelector("#timer")
    timerDisplay.textContent = time_remaining;
}

var endQuiz = function(){
    let finalScore = document.querySelector("#score")
    finalScore.textContent = score;
}

// create function to save score of user
var saveScore = function(event){
    // disable refresh 
    event.preventDefault();

    // cannot have initals be null 
    let initials = document.querySelector("#initials");
    if (!initials.value){
        alert("Please enter your initials.");
        return;
    }

    let highScores = {
        initials: initials.value,
        highScore: score
    };
}

let submitButton = document.querySelector("#initials-btn")

submitButton.addEventListener("click", saveScore);


// update leaderboard to local storage
var updateLeaderboard = function(highScores){
    let leaderboard = getLeaderboard();
    leaderboard.push(highScores);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// get leaderboard from local storage 
var getLeaderboard = function(){
    let storedLeaderboard = localStorage.getItem("leaderboard");
    // if nothing in local storage add to existing 
    if (storedLeaderboard !== null){
        let leaderboard = JSON.parse(storedLeaderboard);
        return leaderboard;
    }
    else{
        leaderboard = [];
    }
    return leaderboard;
}