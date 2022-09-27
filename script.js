'use strict';

let currentQuestion = 0;

function init() {
    updateQuestionCard();
    addAnswerEventListener();
    addNextButtonEventListener();
}

function updateQuestionCard() {
    showQuestion();
    updateQuestionLabel();
}

function showQuestion() {
    const questionEl = document.getElementById('question');
    const answer1El = document.getElementById('answer-1');
    const answer2El = document.getElementById('answer-2');
    const answer3El = document.getElementById('answer-3');
    const answer4El = document.getElementById('answer-4');
    
    questionEl.innerHTML = questions[currentQuestion].question;
    answer1El.innerHTML = questions[currentQuestion].answer1;
    answer2El.innerHTML = questions[currentQuestion].answer2;
    answer3El.innerHTML = questions[currentQuestion].answer3;
    answer4El.innerHTML = questions[currentQuestion].answer4;
}

function updateQuestionLabel() {
    const questionNumberEl = document.getElementById('question-number');
    const questionAmountEl = document.getElementById('question-amount');

    questionNumberEl.innerHTML = currentQuestion + 1;
    questionAmountEl.innerHTML = questions.length;
}

function addAnswerEventListener() {
    const answersEl = document.getElementsByClassName('answer');

    for (let index = 0; index < answersEl.length; index++) {
        answersEl[index].addEventListener('click', () => validateAnswer(index));
    }
}

function addNextButtonEventListener() {
    const nextQuestionBtn = document.getElementById('next-question');

    nextQuestionBtn.addEventListener('click', nextQuestion);
}

function validateAnswer(answerId) {
    const question = questions[currentQuestion];
    const answersEl = document.getElementsByClassName('answer');
    
    if ((answerId + 1) === question.rightAnswer) {
        answersEl[answerId].classList.add('bg-success');
    } else {
        answersEl[answerId].classList.add('bg-danger');
        answersEl[question.rightAnswer - 1].classList.add('bg-success');
    }

    toggleNextButton();
}

function toggleNextButton() {
    const nextQuestionBtn = document.getElementById('next-question');
    
    nextQuestionBtn.disabled = !nextQuestionBtn.disabled;
}

function nextQuestion() {
    currentQuestion++;

    resetAnswerClasses();
    toggleNextButton();
    updateQuestionCard();
}

function resetAnswerClasses() {
    const answersEl = document.getElementsByClassName('answer');

    for (let answer of answersEl) {
        answer.classList.remove('bg-success');
        answer.classList.remove('bg-danger');
    }
}

init();