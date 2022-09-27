'use strict';

let currentQuestion = 0;
let correctQuestions = 0;

function init() {
    updateQuestionCard();
    addAnswerEventListener();
    addNextButtonEventListener();
    addPlayAgainButtonEventListener();
}

function updateQuestionCard() {
    resetAnswerClasses();
    toggleNextButton();
    showQuestion();
    enableAnswerButtons();
    updateQuestionLabel();
    updateProgressBar();
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
    const questionAmountsEl = document.getElementsByClassName('question-amount');

    questionNumberEl.innerHTML = currentQuestion + 1;

    for (let amountEl of questionAmountsEl) {
        amountEl.innerHTML = questions.length;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    let progress = (currentQuestion) / questions.length;
    progress = Math.round(progress * 100);
    
    progressBar.style = `width: ${progress}%`
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

function addPlayAgainButtonEventListener() {
    const playAgainBtn = document.getElementById('play-again');

    playAgainBtn.addEventListener('click', resetGame);
}

function validateAnswer(answerId) {
    const question = questions[currentQuestion];
    const answersEl = document.getElementsByClassName('answer');
    
    if ((answerId + 1) === question.rightAnswer) {
        correctQuestions++;
        answersEl[answerId].classList.add('bg-success', 'text-white');
        playSound(true);
    } else {
        answersEl[answerId].classList.add('bg-danger', 'text-white');
        answersEl[question.rightAnswer - 1].classList.add('bg-success', 'text-white');
        playSound(false);
    }
    
    disableAnswerButtons(answersEl);
    toggleNextButton();
}

function disableAnswerButtons(answersEl) {
    for (let answer of answersEl) {
        answer.disabled = true;
    }
}

function enableAnswerButtons() {
    const answersEl = document.getElementsByClassName('answer');

    for (let answer of answersEl) {
        answer.disabled = false;
    }
}

function toggleNextButton() {
    const nextQuestionBtn = document.getElementById('next-question');
    
    nextQuestionBtn.disabled = !nextQuestionBtn.disabled;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        updateRightAnswersLabel();
        updateProgressBar();
        showEndScreen();
    } else {
        updateQuestionCard();
    }
}

function updateRightAnswersLabel() {
    const correctAnswersEl = document.getElementById('correct-answers');

    correctAnswersEl.innerHTML = correctQuestions;
}

function showEndScreen() {
    const questionScreen = document.getElementById('question-screen');
    const endScreen = document.getElementById('end-screen');
    const cardImage = document.getElementById('card-image');

    questionScreen.classList.add('d-none');
    endScreen.classList.remove('d-none');
    cardImage.src = './img/confetti.jpg';
}

function resetAnswerClasses() {
    const answersEl = document.getElementsByClassName('answer');

    for (let answer of answersEl) {
        answer.classList.remove('bg-success', 'text-white');
        answer.classList.remove('bg-danger', 'text-white');
    }
}

function resetGame() {
    const questionScreen = document.getElementById('question-screen');
    const endScreen = document.getElementById('end-screen');
    const cardImage = document.getElementById('card-image');

    questionScreen.classList.remove('d-none');
    endScreen.classList.add('d-none');
    cardImage.src = './img/card.jpg';

    currentQuestion = 0;
    correctQuestions = 0;

    updateQuestionCard();
}

function playSound(isCorrect) {
    const soundCorrect = new Audio('./sounds/correct.wav');
    const soundWrong = new Audio('./sounds/wrong.wav');

    if (isCorrect) {
        soundCorrect.play();
    } else {
        soundWrong.play();
    }
}


init();