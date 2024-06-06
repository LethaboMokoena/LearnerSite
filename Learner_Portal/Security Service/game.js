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
        question:"What does the acronym 'CIA' stand for in information security?",
        choice1: "Central Intelligence Agency",
        choice2: "Confidentiality, Integrity, Availability",
        choice3: "Cyber Intelligence Agency",
        choice4: "Control, Inspect, Authorize",
        answer: 2,
    },

    {
        question:"What is the primary purpose of a firewall?",
        choice1: "To block all incoming traffic",
        choice2: "To prevent unauthorized access to or from a private network",
        choice3: "To scan for malware",
        choice4: "To manage network addresses",
        answer: 2,
    },

    {
        question:"Which of the following is a common hashing algorithm?",
        choice1: "RSA",
        choice2: "AES",
        choice3: "SHA-256",
        choice4: "DES",
        answer: 3,
    },

    {
        question:"What is phishing?",
        choice1: "A type of malware",
        choice2: "An attack where an attacker sends fraudulent communications",
        choice3: "A method of encryption",
        choice4: "A type of firewall",
        answer: 2,
    },

    {
        question:"What is two-factor authentication (2FA)?",
        choice1: "A method that uses two firewalls for better security",
        choice2: "A process that requires two different forms of identification",
        choice3: "A security measure that uses both a password and a physical key",
        choice4: "A technique for encrypting data twice",
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
