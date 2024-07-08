const quizData = [
    {
        question: "Which country won the 2018 FIFA World Cup?",
        answers: [
            { text: "Germany", correct: false },
            { text: "Brazil", correct: false },
            { text: "France", correct: true },
            { text: "Argentina", correct: false }
        ]
    },
    {
        question: "Who is known as the 'King of Football'?",
        answers: [
            { text: "Lionel Messi", correct: false },
            { text: "Diego Maradona", correct: false },
            { text: "Pelé", correct: true },
            { text: "Cristiano Ronaldo", correct: false }
        ]
    },
    {
        question: "Which club has won the most UEFA Champions League titles?",
        answers: [
            { text: "Manchester United", correct: false },
            { text: "Real Madrid", correct: true },
            { text: "Liverpool", correct: false },
            { text: "Bayern Munich", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    const questionElement = document.createElement('div');
    questionElement.innerText = question.question;
    questionContainer.appendChild(questionElement);

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearStatusClass();
    nextButton.classList.add('hide');
    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
    }
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.removeEventListener('click', selectAnswer);
    });
    if (quizData.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass() {
    answerButtons.classList.remove('correct');
    answerButtons.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
    } else {
        startQuiz();
    }
});

document.addEventListener('DOMContentLoaded', startQuiz);
