const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const gabaritoIndicatorContainer = document.querySelector(".gabarito-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const gabaritoBox = document.querySelector(".gabarito-box");

let questionCounter = 0;
let currentQuestion;
let avaliableQuestions = [];
let avaliableOptions = [];
let correctAnswers = 0;
let attempt = 0;
//pegar as questoes e botar no abaliable question dentro de um array
function setAvaliableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        avaliableQuestions.push(quiz[i])
    }
}
//setar a o numero da questao e opçoes
function getNewQuestion() {
    //setar o numero da questao
    questionNumber.innerHTML = "Questão " + (questionCounter + 1) + " de " + quiz.length;
    //setar o texto da questao
    //pegar uma questao aleatoria
    const questionIndex = avaliableQuestions[Math.floor(Math.random() * avaliableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //pegar a posiçao do question index do avaliable question
    const index1 = avaliableQuestions.indexOf(questionIndex);
    //remove o question index do avaliable question, somente as questoes que nao sao repetidas
    avaliableQuestions.splice(index1, 1);
    //setar opçoes
    //pegar o length das opçoes
    const optionLen = currentQuestion.options.length
        //pegar opçoes dentro de um avaliable options array
    for (let i = 0; i < optionLen; i++) {
        avaliableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //criar opçoes em html
    for (let i = 0; i < optionLen; i++) {
        //opçoes aleatorias
        const optonIndex = avaliableOptions[Math.floor(Math.random() * avaliableOptions.length)];
        //pega a posiçao da opçao no index pelo avaliableOptions
        const index2 = avaliableOptions.indexOf(optonIndex);
        avaliableOptions.splice(index2, 1);
        //remove o optionIndex do avaliable Options, apenas quando as opçoe snao se repetem

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}
//pega o resultado no tempo da questao
function getResult(element) {
    const id = parseInt(element.id);
    //pega a questao correta comparando com a id clicada no option
    if (id === currentQuestion.answer) {
        //seta de cor verde se a opçao clicada estiver correta
        element.classList.add("correta");
        updateAnswerIndicator("correta");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    } else {
        //seta de cor vermelho se a opçao clicada estiver errada
        element.classList.add("errada");
        updateAnswerIndicator("errada");
        //se a questao está incorreta mostra a opçao correta imediatamente
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correta");
            }
        }
    }
    attempt++;
    unclickableOptions();
}
//faz com que todas as opçoes nao possa ser selecionadas pelo usuario
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("questao-respondida");
    }
};

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

function proximo() {
    if (questionCounter === quiz.length) {
        console.log("quiz over")
        quizOver();

    } else {
        getNewQuestion();
    }
}

function quizOver() {
    //deixa o quiz box modo hidden(oculto)
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-de-Tentativas").innerHTML = attempt;
    resultBox.querySelector(".Corretas").innerHTML = correctAnswers;
    resultBox.querySelector(".Erradas").innerHTML = attempt - correctAnswers
    const porcentagem = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".porcentagem").innerHTML = porcentagem.toFixed() + "%";
    resultBox.querySelector(".Pontuaçao-total").innerHTML = correctAnswers + "/" + quiz.length;

    if (porcentagem.toFixed() >= 60) {
        alert("Parabéns voce conseguiu acertar 60% das questoes, acesso liberado");

    } else {
        alert("Que pena, nao foi dessa vez, tente novamente mais tarde");

    }
}



function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function TentarNovamente() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    InicarQuiz();
}

function VoltarAoInicio() {

    //oculta o result box
    resultBox.classList.add("hide");
    //mostra o box inical
    homeBox.classList.remove("hide");
    resetQuiz();


}
//#### Starting point####
function Gabarito() {
    alert("VAMOS AO GABARITO!!");
    resultBox.classList.add("hide");
    gabaritoBox.classList.remove("hide");

}

function VoltarAoInicioB() {
    gabaritoBox.classList.add("hide");
    //mostra o box inical
    homeBox.classList.remove("hide");
    resetQuiz();


}

function InicarQuiz() {
    //oculta o homebox
    homeBox.classList.add("hide");
    //mostra oquiz box
    quizBox.classList.remove("hide");
    //primeiro pegamos todas as questoes no avaliable question
    setAvaliableQuestions();
    //depois ligamos a novas questoes function
    getNewQuestion();

    answersIndicator();
}