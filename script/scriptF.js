let createQuizz;

function checkQuizzName(nameInput)
{
    const nameError = document.querySelector(".name-error");
    if(nameInput.value.length == 0)
        return;
    else if(nameInput.value.length < 20 || nameInput.value.length > 65)
        nameError.innerHTML = "O título do seu quizz deve ter entre 20 e 65 caracteres";
    else
        nameError.innerHTML = '';
}

function checkURL(urlInput)
{
    const informError = document.querySelector(".url-error");
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
    const nQerror = document.querySelector(".questions-error");
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
    const nLerror = document.querySelector(".levels-error");
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

function completeBasics()
{
    const quizzName = document.querySelector(".quizz-name").value;
    const nameError = document.querySelector(".name-error");

    const quizzImageUrl = document.querySelector(".quizz-image-url").value;
    const informError = document.querySelector(".url-error");

    const nOfQuestions = document.querySelector(".n-of-questions").value;
    const nQerror = document.querySelector(".questions-error");

    const nOfLevels = document.querySelector(".n-of-levels").value;
    const nLerror = document.querySelector(".levels-error");

    if(quizzName == '')
        nameError.innerHTML = "Digite o nome do seu quizz";
    if(quizzImageUrl == '')
        informError.innerHTML = "Digite uma url com uma imagem para seu quizz";
    if(nOfQuestions == '')
        nQerror.innerHTML = "Digite quantas perguntas seu quizz terá";
    if(nOfLevels == '')
        nLerror.innerHTML = "Digite quantos níveis seu quizz terá";
    
    if(nameError == '' && informError == '' && nQerror == '' && nLerror == '')
    {
        createQuizz = 
        {
            title: quizzName,
            image: quizzImageUrl
        }

    let quizzflow = document.querySelector(".quizz-basics");
    quizzflow.classList.add("hidden");
    quizzflow = document.querySelector(".create-questions");
    quizzflow.classList.remove("hidden");
    buildQuestions(nOfQuestions);
    }
}

function buildQuestions(questions)
{
    main = document.querySelector(".")
}

function checkQuestionText(qtInput)
{
    const qtError = document.querySelector(".question-error");
    if(qtInput.value.length == 0)
        return;
    else if(qtInput.value.length < 20)
        qtError.innerHTML = "O título da sua pergunta deve ter no mínimo 20 caracteres";
    else
        qtError.innerHTML = '';
}

function checkColor(colorInput)
{
    const colorError = document.querySelector(".color-error");
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
    let answerError;
    if(atInput.placeholder == "Resposta correta")
        answerError = document.querySelector(".rAnswer-error");
    else
    {
        for(let i = 1; i < 4; i++)
        {
            if(atInput.placeholder == `Resposta incorreta-${i}`)
                answerError = document.querySelector(`.wa${i}-error`);
        }
    }
    if(atInput.value == 0)
        answerError.innerHTML = "O texto da resposta não pode estar vazio";
}