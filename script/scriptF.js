let createQuizz;
let numberOFquestions = 0
let numberOFlevels = 0

function checkQuizzName(nameInput)
{
    const nameError = nameInput.nextElementSibling.firstChild;
    if(nameInput.value.length == 0)
        return;
    else if(nameInput.value.length < 20 || nameInput.value.length > 65)
        nameError.innerHTML = "O título do seu quizz deve ter entre 20 e 65 caracteres";
    else
        nameError.innerHTML = '';
}

function checkURL(urlInput)
{
    const informError = urlInput.nextElementSibling.firstChild;
    if(urlInput.value == '')
    {
        informError.innerHTML = '';
        return;
    }
    if(verifyURL(urlInput.value))
        informError.innerHTML = '';
    else
        informError.innerHTML = "O valor informado não é uma URL válida";
}

function verifyURL(url){
    const re = new RegExp(
    '^((https?:)?\\/\\/)?'+ // protocol
    '(?:\\S+(?::\\S*)?@)?' + // authentication
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater

    if (re.test(url)) return true;
    else return false;
}

function checkNumberQuestions(nQuestions)
{
    const nQerror = nQuestions.nextElementSibling.firstChild;
    if(nQuestions.value == '')
    {
        nQerror.innerHTML = '';
        return;
    }
    if(isNaN(nQuestions.value))
        nQerror.innerHTML = "Por favor digite o número (inteiro) de perguntas que o quizz terá";
    else if(nQuestions.value - Math.round(nQuestions.value) != 0)
        nQerror.innerHTML = "O quizz deve ter um número inteiro de perguntas";
    else if(nQuestions.value < 3)
        nQerror.innerHTML = "O quizz deve ter no mínimo 3 perguntas";
    else
        nQerror.innerHTML = '';
}

function checkNumberLevels(nLevels)
{
    const nLerror = nLevels.nextElementSibling.firstChild;
    if(nLevels.value == '')
    {
        nLevels.innerHTML = '';
        return;
    }
    if(isNaN(nLevels.value))
        nLerror.innerHTML = "Por favor digite o número (inteiro) de níveis que o quizz terá";
    else if(nLevels.value - Math.round(nLevels.value) != 0)
        nLerror.innerHTML = "O quizz deve ter um número inteiro de níveis";
    else if(nLevels.value < 2)
        nLerror.innerHTML = "O quizz deve ter no mínimo 2 níveis";
    else
        nLerror.innerHTML = '';
}

function completeBasics(button)
{
    let panel = button.parentElement.parentElement;

    const quizzName = panel.querySelector(".quizz-name");
    const nameError = quizzName.nextElementSibling.firstChild;

    const quizzImageUrl = panel.querySelector(".quizz-image-url");
    const informError = quizzImageUrl.nextElementSibling.firstChild;

    const nOfQuestions = panel.querySelector(".n-of-questions");
    const nQerror = nOfQuestions.nextElementSibling.firstChild;

    const nOfLevels = panel.querySelector(".n-of-levels");
    const nLerror = nOfLevels.nextElementSibling.firstChild;

    if(quizzName.value == ''){
        nameError.innerHTML = "Digite o nome do seu quizz";
    }
    else {
        nameError.innerHTML = ''
    }
    if(quizzImageUrl.value == ''){
        informError.innerHTML = "Digite uma url com uma imagem para seu quizz";
    }
    else {
        informError.innerHTML = ''
    }
    if(nOfQuestions.value == ''){
        nQerror.innerHTML = "Digite quantas perguntas seu quizz terá";
    }
    else {
        nQerror.innerHTML = ''
    }
    if(nOfLevels.value == ''){
        nLerror.innerHTML = "Digite quantos níveis seu quizz terá";
    }
    else {
        nLerror.innerHTML = ''
    }
    
    if(nameError.innerHTML == '' && informError.innerHTML == '' && nQerror.innerHTML == '' && nLerror.innerHTML == '')
    {
        createQuizz = 
        {
            title: quizzName,
            image: quizzImageUrl
        }

        let quizzflow = document.querySelector(".quizz-basics");
        quizzflow.classList.add("displayNone");
        quizzflow = document.querySelector(".quizz-questions");
        quizzflow.classList.remove("displayNone");
        buildQuestions(nOfQuestions);
        buildLevels(nOfLevels);
    }
}

function buildQuestions(questions)
{
    numberOFquestions = questions
    const questionBuild = document.querySelector(".quizz-questions")
    questionBuild.innerHTML = 
    `
    <div class="create-title-align">
        <h2 class="inpage-title weight-700">Crie suas perguntas</h2>
    </div>

    <div class="central-panel flex flex-column question">

            <div class="question-fill-guide weight-700">Pegunta 1</div>
            <input class="create-quizz-input question-text needed"  type="text" placeholder="Texto da pergunta" onfocusout="checkQuestionText(this)">
            <div class="error-text-align"><span class="question-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="Cor de fundo da pergunta" onfocusout="checkColor(this)">
            <div class="error-text-align"><span class="color-error error-text"></span></div>


            <div class="question-fill-guide weight-700">Resposta correta</div>
            <input class="create-quizz-input question-text needed" type="text" placeholder="Resposta correta" onfocusout="checkAnswerText(this)">
            <div class="error-text-align"><span class="answer-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="URL da imagem" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>

            <div class="question-fill-guide weight-700">Respostas Incorretas</div>

            <div class="wrong-answers flex flex-column">

                <div class="wrong-answer-container flex flex-column">
                    <input class="create-quizz-input question-text needed" type="text" placeholder="Resposta incorreta 1" onfocusout="checkAnswerText(this)">
                    <div class="error-text-align"><span class="answer-error error-text"></span></div>
                    <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="URL da imagem 1" onfocusout="checkURL(this)">
                    <div class="error-text-align"><span class="url-error error-text"></span></div>
                </div>

            </div>

            <div class="bt-align">
                <button class="finish-bt red-bg" onclick="completeQuestions()"><span class="bt-text">Prosseguir para criar níveis</span></button>
            </div>

        </div>

    `
    for (let i = 2; i < questions; i++) {
        main.innerHTML += 
        `
        <div class="central-panel flex flex-column" onlick="expandQuestion(this)">
            <div class="qtitle-and-icon flex">
                <div class="question-fill-guide weight-700">Pegunta ${i}</div>
                img src="/BuzzQuizz/assets/Vector.png" alt="click to expand">
            </div>
        </div>

        <div class="central-panel flex flex-column question hidden">

            <div class="question-fill-guide weight-700">Pegunta ${i}</div>
            <input class="create-quizz-input question-text needed" type="text" placeholder="Texto da pergunta" onfocusout="checkQuestionText(this)">
            <div class="error-text-align"><span class="question-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="Cor de fundo da pergunta" onfocusout="checkColor(this)">
            <div class="error-text-align"><span class="color-error error-text"></span></div>


            <div class="question-fill-guide weight-700">Resposta correta</div>
            <input class="create-quizz-input question-text needed" type="text" placeholder="Resposta correta" onfocusout="checkAnswerText(this)">
            <div class="error-text-align"><span class="answer-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="URL da imagem" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>

            <div class="question-fill-guide weight-700">Respostas Incorretas</div>

            <div class="wrong-answers flex flex-column">

                <div class="wrong-answer-container flex flex-column">
                    <input class="create-quizz-input question-text needed" type="text" placeholder="Resposta incorreta 1" onfocusout="checkAnswerText(this)">
                    <div class="error-text-align"><span class="answer-error error-text"></span></div>
                    <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="URL da imagem 1" onfocusout="checkURL(this)" onfocus="unlockWrongAnswer(this)">
                    <div class="error-text-align"><span class="url-error error-text"></span></div>
                </div>

            </div>

        </div>
        `
    }

}

function checkQuestionText(qtInput)
{
    const qtError = qtInput.nextElementSibling.firstChild;
    if(qtInput.value.length == 0)
        return;
    else if(qtInput.value.length < 20){
        qtError.innerHTML = "O título da sua pergunta deve ter no mínimo 20 caracteres"; 
    }
    else{
        qtError.innerHTML = '';
    }
}

function checkColor(colorInput)
{
    const colorError = colorInput.nextElementSibling.firstChild;
    if(colorInput.value.length == 0)
        return;
    else if(verifyColor(colorInput.value))
        colorError.innerHTML = '';
    else
        colorError.innerHTML = "A cor da sua pergunta deve ser um código hexadecimal de cores (6 digitos)";
}

function verifyColor(color)
{
    const re = new RegExp(/^#[0-9A-Fa-f]{6}$/);
    if (re.test(color)) return true;
    else return false;
}

function checkAnswerText(atInput)
{
    let answerError = atInput.nextElementSibling.firstChild;
    if(atInput.value == '')
        answerError.innerHTML = "O texto da resposta não pode estar vazio";
}

function completeQuestions() {
    const span = document.querySelectorAll('.q span')
    for (let i = 0; i < span.length; i++) {
        if (span[i].innerHTML !== '') {
            
            return alert('Preencha corretamenta aa')
        }
    }
    const need = document.querySelectorAll('.q .needed')
    for (let i = 0; i < need.length; i++) {
        if(need[i].value === ''){
            alert('Preencha corretamenta')
            return
        }
    }
    for (let i = 0; i < need.length; i++) {
        if(need[i].value === ''){
            alert('Preencha corretamenta')
            return
        }
        else {
            //console.log('aqui')
            createQuizz.questions = []
            for (let i = 0; i < numberOFquestions; i++) {
                let w2 = ''
                let w3 = ''

                for (let j = 2; j < 4; j++) {
                    let w = document.querySelector(`.q .q${i+1} .wrong-answers .wrong${j}`) 
                    if (w.value !== '') {
                        if(w2 === ''){
                            w2 = w.value
                            imgw2 = document.querySelector(`.q .q${i+1} .wrong-answers .imgWrong${j}`).value
                        }
                        else{
                            w3 = w.value
                            imgw3 = document.querySelector(`.q .q${i+1} .wrong-answers .imgWrong${j}`).value
                        }
                    }
                    
                }
                if (w2 === ''){
                    createQuizz.questions.push( {
                        title: document.querySelector(`.q .q${i+1} .Title`).value,
                        color: document.querySelector(`.q .q${i+1} .colorTitle`).value,
                        answers: [ {
                            text: document.querySelector(`.q .q${i+1} .correct`).value,
                            image: document.querySelector(`.q .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        }

                        ]
                    })
                    document.querySelector(".quizz-questions").classList.add("displayNone")
                    document.querySelector(".quizz-levels").classList.remove("displayNone")
                }
                else if (w3 === '' && w2 !== ''){
                    createQuizz.questions.push( {
                        title: document.querySelector(`.q .q${i+1} .Title`).value,
                        color: document.querySelector(`.q .q${i+1} .colorTitle`).value,
                        answers: [ {
                            text: document.querySelector(`.q .q${i+1} .correct`).value,
                            image: document.querySelector(`.q .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong2`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong2`).value,
                            isCorrectAnswer: false
                        }

                        ]
                    })
                    document.querySelector(".quizz-questions").classList.add("displayNone")
                    document.querySelector(".quizz-levels").classList.remove("displayNone")
                }
                else {
                    createQuizz.questions.push( {
                        title: document.querySelector(`.q .q${i+1} .Title`).value,
                        color: document.querySelector(`.q .q${i+1} .colorTitle`).value,
                        answers: [ {
                            text: document.querySelector(`.q .q${i+1} .correct`).value,
                            image: document.querySelector(`.q .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong2`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong2`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.q .q${i+1} .wrong3`).value,
                            image: document.querySelector(`.q .q${i+1} .imgWrong3`).value,
                            isCorrectAnswer: false
                        }

                        ]
                    })
                    document.querySelector(".quizz-questions").classList.add("displayNone")
                    document.querySelector(".quizz-levels").classList.remove("displayNone")
                }
            }
        }
    }
    //console.log(createQuizz)
}

function buildLevels(number){
    const levels = document.querySelector('.levels')
    levels.innerHTML=
    `
        <div class="central-panel flex flex-column level">
            <div class="question-fill-guide weight-700">Nivel 1</div>
            <input class="create-quizz-input level-text" type="text" placeholder="Título do nível" onfocusout="checkLevelText(this)">
            <div class="error-text-align"><span class="lv-title-error error-text"></span></div>
            <input class="create-quizz-input min-percentage" type="text" placeholder="% de acerto mínima" onfocusout="checkPercentage(this)">
            <div class="error-text-align"><span class="percentage-error error-text"></span></div>
            <input class="create-quizz-input url" type="text" placeholder="URL da imagem do nível" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>
            <input class="create-quizz-input question-text" type="text" placeholder="Descrição do nível" onfocusout="checkLvlDesc(this)">
            <div class="error-text-align"><span class="lv-desc-error error-text"></span></div>
        </div>
    `
    for (let i = 2; i <= number; i++) {
        levels.innerHTML += `
        <div class="central-panel flex flex-column" onClick="expandQuestion(this)">
            <div class="qtitle-and-icon flex">
                <div class="question-fill-guide weight-700">Nível ${i}</div>
                img src="/BuzzQuizz/assets/Vector.png" alt="click to expand">
            </div>
        </div>
        <div class="central-panel flex flex-column level">
            <div class="question-fill-guide weight-700">Nivel ${i}</div>
            <input class="create-quizz-input level-text" type="text" placeholder="Título do nível" onfocusout="checkLevelText(this)">
            <div class="error-text-align"><span class="lv-title-error error-text"></span></div>
            <input class="create-quizz-input min-percentage" type="text" placeholder="% de acerto mínima" onfocusout="checkPercentage(this)">
            <div class="error-text-align"><span class="percentage-error error-text"></span></div>
            <input class="create-quizz-input url" type="text" placeholder="URL da imagem do nível" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>
            <input class="create-quizz-input question-text" type="text" placeholder="Descrição do nível" onfocusout="checkLvlDesc(this)">
            <div class="error-text-align"><span class="lv-desc-error error-text"></span></div>
        </div>
        `
    }
    numberOFlevels = number
}

function checkLevelText(lvlTxtInput)
{
    const lvlTxtError = lvlTxtInput.nextElementSibling.firstChild;
    if(lvlTxtInput.value == '')
        return;
    else if(lvlTxtInput.value.length < 10)
        lvlTxtError.innerHTML = "O título do nível deve ter no mínimo 10 caracteres";
    else
        lvlTxtError.innerHTML = '';
}

function checkPercentage(percentageInput)
{
    const percentError = percentageInput.nextElementSibling.firstChild;
    if(percentageInput.value == '')
    {
        return;
    }
    if(isNaN(percentageInput.value))
        percentError.innerHTML = "Por favor digite a porcentagem de acertos (sem o simbolo %)";
    else if(percentageInput.value < 0 || percentageInput.value > 100)
        percentError.innerHTML = "A porcentagem deve ser um número entre 0 e 100";
    else
        percentError.innerHTML = '';
}

function checkLvlDesc(lvlDesc)
{
    const lvDescError = lvlDesc.nextElementSibling.firstChild;
    if(lvlDesc.value == '')
        return;
    else if(lvlDesc.value.length < 30)
        lvDescError.innerHTML = "A descrição do nível deve ter no mínimo 30 caracteres";
    else
        lvDescError.innerHTML = '';
}

function expandQuestion(hiddenQuestion)
{
    hiddenQuestion.classList.add("hidden");
    const showQuestion = hiddenQuestion.nextElementSibling;
    showQuestion.classList.remove("hidden");
}

function unlockWrongAnswer(inputFocus)
{
    const wrongAnswers = inputFocus.parentElement.parentElement;
    for(let i = 1; i < 4; i++)
    {
        if(inputFocus.placeholder == `URL da imagem ${i}`)
        {
            wrongAnswers.innerHTML +=
            `
            <div class="wrong-answer-container flex flex-column">
                <input class="create-quizz-input question-text needed" type="text" placeholder="Resposta incorreta ${i+1}" onfocusout="checkAnswerText(this)">
                <div class="error-text-align"><span class="answer-error error-text"></span></div>
                <input class="create-quizz-input question-bgcolor needed" type="text" placeholder="URL da imagem ${i+1}" onfocusout="checkURL(this)" onfocus="unlockWrongAnswer(this)">
                <div class="error-text-align"><span class="url-error error-text"></span></div>
            </div>
            `
        }
    }
}
function end (){
    document.querySelector('.quizz-levels').classList.add('displayNone')
    document.querySelector('.finalScreenQuizz').classList.remove('displayNone')


    createQuizz.levels = []
    let inputTitle 
    let inputPorcent 
    let inputURL
    let inputText
    for (let i = 0; i < numberOFlevels; i++) {
        inputTitle = document.querySelector(`.l${i+1}`).value
        inputPorcent = document.querySelector(`.Porcentl${i+1}`).value
        inputURL = document.querySelector(`.URLl${i+1}`).value
        inputText = document.querySelector(`.Textl${i+1}`).value
        
        createQuizz.levels.push({
            title: inputTitle,
            image: inputURL,
            text: inputText,
            minValue: inputPorcent
        })   
    }

    document.querySelector('.quizzDone').style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${createQuizz.image}")` // ${createQuizz.image}
    document.querySelector('.quizzDone').style.backgroundSize = 'contain, cover'
    document.querySelector('.quizzDone p').innerHTML = createQuizz.title

    //console.log(createQuizz)
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',createQuizz)
    promisse.then((resposta)=> {
        document.querySelector('.acessQuizz').onclick = `insideQuizz(${resposta.data.id})`

        console.log('deu certo')
        console.log(resposta)

        let newId = []
        let newId2 = []
        
        if (localStorage.getItem("id") === null) {
            newId = [resposta.data]
        }
        else{
            newId = JSON.parse(localStorage.getItem("id"))
            for (let i = 0; i < newId.length; i++) {
                newId2.push(newId[i])
            }
            newId2.push(resposta.data)
            newId = newId2
            //newId = [JSON.parse(localStorage.getItem("id")), resposta.data]
        }
        
        console.log(newId)
        localStorage.setItem("id", JSON.stringify(newId));
        console.log(JSON.parse(localStorage.getItem("id")))
    })
    promisse.catch((resposta)=> {
        console.log(resposta)
        alert('preencha corretamente')
    })
}

