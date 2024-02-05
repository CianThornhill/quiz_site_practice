const questions = [
    {
        question: "What is the name of the first Pokemon in the Pokedex?",
        answers:[
            {text: "Bulbasaur", correct:true},
            {text: "Magikarp", correct:false},
            {text: "Pikachu", correct:false},
            {text: "Mew", correct:false},
        ]
    },
    {
        question: "Which pokemon evolves from Charmander",
        answers:[
            {text: "Charizard", correct:false},
            {text: "Gyrados", correct:false},
            {text: "Charmeleon", correct:true},
            {text: "Dragonair", correct:false},
        ]
    },
    {
        question: "Which pokemon evolves from Charmander",
        answers:[
            {text: "Charizard", correct:false},
            {text: "Gyrados", correct:false},
            {text: "Charmeleon", correct:true},
            {text: "Dragonair", correct:false},
        ]
    },
    {
        question: "Which pokemon evolves into Raichu when exposed to a Thunder Stone?",
        answers:[
            {text: "Pichu", correct:false},
            {text: "Eevee", correct:false},
            {text: "Machop", correct:false},
            {text: "Pikachu", correct:true},
        ]
    },
    {
        question: "What is the pre-evolution of Machamp",
        answers:[
            {text: "Machoke", correct:true},
            {text: "Geodude", correct:false},
            {text: "Hitmonchan", correct:false},
            {text: "Marshstomp", correct:false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    console.log("button clicked.");
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();