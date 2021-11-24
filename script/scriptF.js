let createQuizz;
let numberOFlevels = 0
let numberOfQuestions = 0;

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
    let panel = button.parentElement.previousElementSibling;

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
            title: quizzName.value,
            image: quizzImageUrl.value
        }

        let quizzflow = document.querySelector(".quizz-basics");
        quizzflow.classList.add("displayNone");
        quizzflow = document.querySelector(".quizz-questions");
        quizzflow.classList.remove("displayNone");
        numberOfQuestions = nOfQuestions.value;
        numberOFlevels = nOfLevels.value;
        buildQuestions(nOfQuestions.value);
        buildLevels(nOfLevels.value);
    }
    else
    {
        alert("Alguma validação falhou");
    }
}

function buildQuestions(questions)
{
    const questionBuild = document.querySelector(".quizz-questions")
    questionBuild.innerHTML = 
    `
    <div class="create-title-align">
        <h2 class="inpage-title weight-700">Crie suas perguntas</h2>
    </div>

    <div class="central-panel flex flex-column q1" data-identifier="question">

        <div class="question-fill-guide weight-700">Pegunta 1</div>
        <input class="create-quizz-input question-text needed Title" type="text" placeholder="Texto da pergunta" onfocusout="checkQuestionText(this)">
        <div class="error-text-align"><span class="question-error error-text"></span></div>
        <input class="create-quizz-input question-bgcolor needed colorTitle" type="text" placeholder="Cor de fundo da pergunta" onfocusout="checkColor(this)">
        <div class="error-text-align"><span class="color-error error-text"></span></div>


        <div class="question-fill-guide weight-700">Resposta correta</div>
        <input class="create-quizz-input question-text needed correct" type="text" placeholder="Resposta correta" onfocusout="checkAnswerText(this)">
        <div class="error-text-align"><span class="answer-error error-text"></span></div>
        <input class="create-quizz-input question-bgcolor needed imgCorrect" type="text" placeholder="URL da imagem" onfocusout="checkURL(this)">
        <div class="error-text-align"><span class="url-error error-text"></span></div>

        <div class="question-fill-guide weight-700">Respostas Incorretas</div>

        <div class="wrong-answers flex flex-column">

            <div class="wrong-answer-container flex flex-column">
                <input class="create-quizz-input question-text needed wrong1" type="text" placeholder="Resposta incorreta 1" onfocusout="checkAnswerText(this)">
                <div class="error-text-align"><span class="answer-error error-text"></span></div>
                <input class="create-quizz-input question-bgcolor needed imgWrong1" type="text" placeholder="URL da imagem 1" onfocusout="checkURL(this)">
                <div class="error-text-align"><span class="url-error error-text"></span></div>
            </div>
            <div class="wrong-answer-container flex flex-column">
                <input class="create-quizz-input question-text needed wrong2" type="text" placeholder="Resposta incorreta 2" onfocusout="checkAnswerText(this)">
                <div class="error-text-align"><span class="answer-error error-text"></span></div>
                <input class="create-quizz-input question-bgcolor needed imgWrong2" type="text" placeholder="URL da imagem 2" onfocusout="checkURL(this)">
                <div class="error-text-align"><span class="url-error error-text"></span></div>
            </div>
            <div class="wrong-answer-container flex flex-column">
                <input class="create-quizz-input question-text needed wrong3" type="text" placeholder="Resposta incorreta 3" onfocusout="checkAnswerText(this)">
                <div class="error-text-align"><span class="answer-error error-text"></span></div>
                <input class="create-quizz-input question-bgcolor needed imgWrong3" type="text" placeholder="URL da imagem 3" onfocusout="checkURL(this)">
                <div class="error-text-align"><span class="url-error error-text"></span></div>
            </div>

        </div>

    </div>
    `
    for (let i = 2; i <= questions; i++) {
        questionBuild.innerHTML += 
        `
        <div class="central-panel flex flex-column" data-identifier="expand" onClick="expandQuestion(this)">
            <div class="qtitle-and-icon flex">
                <div class="question-fill-guide weight-700">Pegunta ${i}</div>
                <img src="/BuzzQuizz/assets/Vector.png" alt="click to expand">
            </div>
        </div>

        <div class="central-panel flex flex-column q${i} hidden" data-identifier="question">

            <div class="question-fill-guide weight-700">Pegunta ${i}</div>
            <input class="create-quizz-input question-text needed Title" type="text" placeholder="Texto da pergunta" onfocusout="checkQuestionText(this)">
            <div class="error-text-align"><span class="question-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed colorTitle" type="text" placeholder="Cor de fundo da pergunta" onfocusout="checkColor(this)">
            <div class="error-text-align"><span class="color-error error-text"></span></div>


            <div class="question-fill-guide weight-700">Resposta correta</div>
            <input class="create-quizz-input question-text needed correct" type="text" placeholder="Resposta correta" onfocusout="checkAnswerText(this)">
            <div class="error-text-align"><span class="answer-error error-text"></span></div>
            <input class="create-quizz-input question-bgcolor needed imgCorrect" type="text" placeholder="URL da imagem" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>

            <div class="question-fill-guide weight-700">Respostas Incorretas</div>

            <div class="wrong-answers flex flex-column">

                <div class="wrong-answer-container flex flex-column">
                    <input class="create-quizz-input question-text needed wrong1" type="text" placeholder="Resposta incorreta 1" onfocusout="checkAnswerText(this)">
                    <div class="error-text-align"><span class="answer-error error-text"></span></div>
                    <input class="create-quizz-input question-bgcolor needed imgWrong1" type="text" placeholder="URL da imagem 1" onfocusout="checkURL(this)">
                    <div class="error-text-align"><span class="url-error error-text"></span></div>
                </div>
                <div class="wrong-answer-container flex flex-column">
                    <input class="create-quizz-input question-text needed wrong2" type="text" placeholder="Resposta incorreta 2" onfocusout="checkAnswerText(this)">
                    <div class="error-text-align"><span class="answer-error error-text"></span></div>
                    <input class="create-quizz-input question-bgcolor needed imgWrong2" type="text" placeholder="URL da imagem 2" onfocusout="checkURL(this)">
                    <div class="error-text-align"><span class="url-error error-text"></span></div>
                </div>
                <div class="wrong-answer-container flex flex-column">
                    <input class="create-quizz-input question-text needed wrong3" type="text" placeholder="Resposta incorreta 3" onfocusout="checkAnswerText(this)">
                    <div class="error-text-align"><span class="answer-error error-text"></span></div>
                    <input class="create-quizz-input question-bgcolor needed imgWrong3" type="text" placeholder="URL da imagem 3" onfocusout="checkURL(this)">
                    <div class="error-text-align"><span class="url-error error-text"></span></div>
                </div>

            </div>

        </div>
        `
    }
    questionBuild.innerHTML +=
        `
        <div class="bt-align">
            <button class="finish-bt red-bg" onclick="completeQuestions()"><span class="bt-text">Prosseguir para criar níveis</span></button>
        </div>
        `

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
    else
        answerError.innerHTML = '';
}

function completeQuestions(button) 
{
    let allQuestions = document.querySelector(".quizz-questions");
    let notReady = 0;
    for(let i = 1; i <= numberOfQuestions; i++)
    {
        let questionPanel = allQuestions.querySelector(`.q${i}`);

        const quizzQuestion = questionPanel.querySelector(".Title");
        const questionError = quizzQuestion.nextElementSibling.firstChild;

        const quizzColor = questionPanel.querySelector(".colorTitle");
        const colorError = quizzColor.nextElementSibling.firstChild;

        const rightAnswer = questionPanel.querySelector(".correct");
        const rError = rightAnswer.nextElementSibling.firstChild;

        const rightURL = questionPanel.querySelector(".imgCorrect");
        const urlError = rightURL.nextElementSibling.firstChild;

        const wrong1 = questionPanel.querySelector(".wrong1");
        const wrongError = wrong1.nextElementSibling.firstChild;

        const imgWrong1 = questionPanel.querySelector(".imgWrong1");
        const imgError = imgWrong1.nextElementSibling.firstChild;

        if(quizzQuestion.value == '')
            questionError.innerHTML = "Preencha uma pergunta";
        if(quizzColor.value == '')
            colorError.innerHTML = "Insira uma cor para a pergunta";
        if(rightAnswer.value == '')
            rError.innerHTML = "Preencha uma resposta correta";
        if(rightURL.value == '')
            urlError.innerHTML = "Insira uma URL válida";
        if(wrong1.value == '')
            wrongError.innerHTML = "Sua pergunta deve ter pelomenos uma resposta incorreta";
        if(imgWrong1.value == '')
            imgError.innerHTML = "Insira uma URL válida";

        if(quizzQuestion.value == '' || quizzColor == '' || rightAnswer == '' || rightURL == '' || wrong1 == '' || imgWrong1 == '')
            notReady = 1;
    }
    if(notReady == 1)
    {
        alert("Alguma validação falhou");
        return;
    }

    createQuizz.questions = [];

    for (let i = 0; i < numberOfQuestions; i++)
    {
        let w2 = '';
        let w3 = '';

        for (let j = 2; j < 4; j++)
        {    
            let w = document.querySelector(`.quizz-questions .q${i+1} .wrong-answers .wrong${j}`);
            if (w.value !== '')
            {
                if(w2 === '')
                {
                    w2 = w.value
                    imgw2 = document.querySelector(`.quizz-questions .q${i+1} .wrong-answers .imgWrong${j}`).value
                }
                else
                {
                    w3 = w.value
                    imgw3 = document.querySelector(`.quizz-questions .q${i+1} .wrong-answers .imgWrong${j}`).value
                }
            }
                    
        }

        if (w2 === '')
        {
            createQuizz.questions.push
            ( 
                {
                    title: document.querySelector(`.quizz-questions .q${i+1} .Title`).value,
                    color: document.querySelector(`.quizz-questions .q${i+1} .colorTitle`).value,
                    answers: 
                    [ 
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .correct`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        }
                    ]
                }
            )
                    
            document.querySelector(".quizz-questions").classList.add("displayNone");
            document.querySelector(".quizz-levels").classList.remove("displayNone");

        }
        else if (w3 === '' && w2 !== '')
        {
            createQuizz.questions.push
            ( 
                {
                    title: document.querySelector(`.quizz-questions .q${i+1} .Title`).value,
                    color: document.querySelector(`.quizz-questions .q${i+1} .colorTitle`).value,
                    answers: 
                    [ 
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .correct`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong2`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong2`).value,
                            isCorrectAnswer: false
                        }
                    ]
                }
            )

            document.querySelector(".quizz-questions").classList.add("displayNone");
            document.querySelector(".quizz-levels").classList.remove("displayNone");
        }
        else 
        {
            createQuizz.questions.push
            ( 
                {
                    title: document.querySelector(`.quizz-questions .q${i+1} .Title`).value,
                    color: document.querySelector(`.quizz-questions .q${i+1} .colorTitle`).value,
                    answers: 
                    [ 
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .correct`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgCorrect`).value,
                            isCorrectAnswer: true
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong1`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong1`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong2`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong2`).value,
                            isCorrectAnswer: false
                        },
                        {
                            text: document.querySelector(`.quizz-questions .q${i+1} .wrong3`).value,
                            image: document.querySelector(`.quizz-questions .q${i+1} .imgWrong3`).value,
                            isCorrectAnswer: false
                        }
                    ]
                }
            )

            document.querySelector(".quizz-questions").classList.add("displayNone");
            document.querySelector(".quizz-levels").classList.remove("displayNone");
        }
    }
}

function buildLevels(number)
{
    const levels = document.querySelector('.levels')
    levels.innerHTML=
    `
        <div class="central-panel flex flex-column level" data-identifier="level">
            <div class="question-fill-guide weight-700">Nivel 1</div>
            <input class="create-quizz-input level-text l1" type="text" placeholder="Título do nível" onfocusout="checkLevelText(this)">
            <div class="error-text-align"><span class="lv-title-error error-text"></span></div>
            <input class="create-quizz-input min-percentage Porcentl1" type="text" placeholder="% de acerto mínima" onfocusout="checkLevelZero(this)">
            <div class="error-text-align"><span class="percentage-error error-text"></span></div>
            <input class="create-quizz-input url URLl1" type="text" placeholder="URL da imagem do nível" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>
            <input class="create-quizz-input question-text Textl1" type="text" placeholder="Descrição do nível" onfocusout="checkLvlDesc(this)">
            <div class="error-text-align"><span class="lv-desc-error error-text"></span></div>
        </div>
    `
    for (let i = 2; i <= number; i++) {
        levels.innerHTML += `
        <div class="central-panel flex flex-column" onClick="expandQuestion(this)" data-identifier="expand">
            <div class="qtitle-and-icon flex">
                <div class="question-fill-guide weight-700">Nível ${i}</div>
                <img src="/BuzzQuizz/assets/Vector.png" alt="click to expand">
            </div>
        </div>
        <div class="central-panel flex flex-column level hidden" data-identifier="level">
            <div class="question-fill-guide weight-700">Nivel ${i}</div>
            <input class="create-quizz-input level-text l${i}" type="text" placeholder="Título do nível" onfocusout="checkLevelText(this)">
            <div class="error-text-align"><span class="lv-title-error error-text"></span></div>
            <input class="create-quizz-input min-percentage Porcentl${i}" type="text" placeholder="% de acerto mínima" onfocusout="checkPercentage(this)">
            <div class="error-text-align"><span class="percentage-error error-text"></span></div>
            <input class="create-quizz-input url URLl${i}" type="text" placeholder="URL da imagem do nível" onfocusout="checkURL(this)">
            <div class="error-text-align"><span class="url-error error-text"></span></div>
            <input class="create-quizz-input question-text Textl${i}" type="text" placeholder="Descrição do nível" onfocusout="checkLvlDesc(this)">
            <div class="error-text-align"><span class="lv-desc-error error-text"></span></div>
        </div>
        `
    }
    numberOFlevels = number;
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

function checkLevelZero(percentageInput)
{
    const percentError = percentageInput.nextElementSibling.firstChild;
    if(percentageInput.value == '')
    {
        return;
    }
    if(isNaN(percentageInput.value))
        percentError.innerHTML = "Por favor digite a porcentagem de acertos de 0 (sem o simbolo %)";
    else if(percentageInput.value > 0)
        percentError.innerHTML = "O nível 1 deve ter uma porcentagem de acerto de 0%";
    else
        percentError.innerHTML = '';
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

function end()
{
    let allLevels = document.querySelector(".levels");
    let notReady = 0;
    for(let i = 1; i <= numberOFlevels; i++)
    {
        const levelTitle = allLevels.querySelector(`.l${i}`);
        console.log(levelTitle)
        const lvTitleError = levelTitle.nextElementSibling.firstChild;

        const minPercentage = allLevels.querySelector(`.Porcentl${i}`);
        const percentError = minPercentage.nextElementSibling.firstChild;

        const lvlURL = allLevels.querySelector(`.URLl${i}`);
        const urlError = lvlURL.nextElementSibling.firstChild;

        const descLevel = allLevels.querySelector(`.Textl${i}`);
        const descError = descLevel.nextElementSibling.firstChild;

        if(levelTitle.value == '')
            lvTitleError.innerHTML = "Preencha o título do nível";
        if(minPercentage.value == '')
            percentError.innerHTML = "Insira a porcentagem mínima de acerto para atingir no nível";
        if(lvlURL.value == '')
            urlError.innerHTML = "Insira uma URL válida";
        if(descLevel.value == '')
            descError.innerHTML = "Insira uma descrição para o nível";
        if(levelTitle.value == '' || minPercentage.value == '' || lvlURL.value == '' || descLevel.value == '')
            notReady = 1;
    }
    if(notReady == 1)
    {
        alert("Alguma validação falhou");
        return;
    }

    document.querySelector('.quizz-levels').classList.add('displayNone');
    document.querySelector('.finalScreenQuizz').classList.remove('displayNone');

    createQuizz.levels = []
    let inputTitle;
    let inputPorcent;
    let inputURL;
    let inputText;

    for (let i = 0; i < numberOFlevels; i++)
    {
        inputTitle = document.querySelector(`.l${i+1}`).value;
        inputPorcent = document.querySelector(`.Porcentl${i+1}`).value;
        inputURL = document.querySelector(`.URLl${i+1}`).value;
        inputText = document.querySelector(`.Textl${i+1}`).value;
        
        createQuizz.levels.push({
            title: inputTitle,
            image: inputURL,
            text: inputText,
            minValue: inputPorcent
        })   
    }

    document.querySelector('.quizzDone').style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${createQuizz.image}")` // ${createQuizz.image}
    console.log(createQuizz.image);
    document.querySelector('.quizzDone').style.backgroundSize = 'contain, cover'
    document.querySelector('.quizzDone p').innerHTML = createQuizz.title

    console.log(createQuizz);

    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',createQuizz)
    promisse.then((resposta)=> {
        document.querySelector('.acessQuizz').setAttribute('onclick', `insideQuizz(${resposta.data.id})`);

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

