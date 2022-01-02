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

// Reference variables to html 
var timer = document.querySelector("#timer");
var questionContentEl = document.querySelector("#questions-list");
var startBtn = document.querySelector("#start-btn")


// function to start timer/quiz
var time_remaining = 120;

var startQuiz = function(){
    displayQuestion();
};

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

document.querySelector("#answer-options").addEventListener("click", checkAnswer)

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
}


// loop through series of questions 

// subtract time bc incorrect question

// quiz ends when all questions are answered or timer is over

// save initials and high score to local storage 

startQuiz();