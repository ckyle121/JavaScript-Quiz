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
var time_remaining = 60;
currentQuestion = 0;

// Reference variables to html 
var questionContentEl = document.querySelector("#question-content");
var startBtn = document.querySelector("#start-btn")
let timerDisplay = document.querySelector("#timer")

// function to hide quiz before user hits begin
function hideQuestoins(){
    questionContentEl.setAttribute("hidden", true)
}

// start quiz when user hits begin button 
startBtn.addEventListener("click", startQuiz);

// function to start timer/quiz
function startQuiz() {
    // disable hidden questions function
    hideQuestoins();
    questionContentEl.removeAttribute("hidden");

    // initalize current question
    displayQuestion();

    // start timer
    intervalID = setInterval(timerCountdown, 1000);
};

// create a countdown function for the timer

function timerCountdown(){
    time_remaining--;
    if (time_remaining < 0) {
        endQuiz();
        document.querySelector("#question-content").setAttribute("hidden");
    }
    timerDisplay.textContent = time_remaining; 
}

// create function to display quiz questions 

function displayQuestion(){
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

// when user clicks on answer, determine if its correct or incorrect

document.querySelector("#answer-options").addEventListener("click",checkAnswer);


// determine if content for selected button and correct answer is the same 
function correctAnswer(answerBtn){
    return answerBtn.textContent === questions[currentQuestion].answer;
}

// check to see if answer selected is correct
function checkAnswer(event){
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


function endQuiz(){
    let finalScore = document.querySelector("#score")
    finalScore.textContent = "You scored " + score + " points!";
    document.querySelector("#timer").setAttribute("hidden", true);
    document.querySelector("question-content").setAttribute("hidden", true);
}

// when user hits submit button it adds their score and initials to the leaderboard
var submitButton = document.querySelector("#initials-btn")

submitButton.addEventListener("click", saveScore);

// create function to save score of user
function saveScore(event){
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
        userScore: score
    };

    // add user to leaderboard for local storage
    updateLeaderboard(highScores);

    // hide questions because game is over 
    hideQuestoins();

    // show the top scores
    displayLeaderboard();
}

// update leaderboard in local storage
function updateLeaderboard(highScores){
    let leaderboard = getLeaderboard();
    leaderboard.push(highScores);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// get leaderboard from local storage 
function getLeaderboard(){
    let storedLeaderboard = localStorage.getItem("leaderboard");
    // if nothing in local storage add to existing 
    if (storedLeaderboard !== null){
        let leaderboard = JSON.parse(storedLeaderboard);
        console.log(leaderboard)
        return leaderboard;
    }
    else{
        leaderboard = [];
    }
    return leaderboard;
}

// display high scores from least to greatest
function sortLeaderboard(){
    let leaderboard = getLeaderboard();
    if (!leaderboard){
        return;
    }

    leaderboard.sort(function(a, b){
        return b.userScore - a.userScore;
    });

    return leaderboard;
}

// 
function displayLeaderboard(){
    var leaderboardList = document.querySelector("#leaderboard-list");
    leaderboardList.innerHTML = "";
    let leaderboard = sortLeaderboard();
    for (let i = 0; i < leaderboard.length; i++){
        let userEntry = leaderboard[i];
        let newScore = document.createElement("li");
        newScore.textContent = 
            userEntry.initials + " : " + userEntry.userScore;
        leaderboardList.append(newScore);
    }
}