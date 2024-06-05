const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question:"What is data analytics??",
        choice1: "The process of storing large amounts of data",
        choice2: "The process of examining data sets to draw conclusions",
        choice3: "The process of creating data models",
        choice4: "The process of visualizing data",
        answer: 2,
    },

    {
        question:"Name the four types of data analytics.?",
        choice1: "Descriptive, diagnostic, predictive, and prescriptive",
        choice2: "Descriptive, historical, future, and operational",
        choice3: "Diagnostic, operational, strategic, and predictive",
        choice4: "Prescriptive, descriptive, forecasting, and diagnostic",
        answer: 1,
    },

    {
        question:"What is a data warehouse??",
        choice1: "A storage system for raw, unprocessed data",
        choice2: "A central repository for integrated data from multiple sources",
        choice3: "A database for transactional data processing",
        choice4: "A tool for data visualization",
        answer: 2,
    },

    {
        question:"What is the difference between structured and unstructured data??",
        choice1: "Structured data is only numerical, unstructured data is textual",
        choice2: "Structured data is organized in rows and columns, unstructured data is not",
        choice3: "Structured data cannot be queried, unstructured data can",
        choice4: "Structured data is always accurate, unstructured data is not",
        answer: 2,
    },

    {
        question:"What is data cleaning??",
        choice1: "The process of deleting outdated data",
        choice2: "The process of identifying and correcting errors in data",
        choice3: "The process of organizing data into tables",
        choice4: "The process of storing data securely",
        answer: 2,
    },
    // Add more questions as needed


];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
