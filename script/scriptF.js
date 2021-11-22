let createQuizz;
let numberOFquestions = 0
let numberOFlevels = 0

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
    const informError = urlInput.nextElementSibling;
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

    if(quizzName == ''){
        nameError.innerHTML = "Digite o nome do seu quizz";
    }
    else {
        nameError.innerHTML = ''
    }
    if(quizzImageUrl == ''){
        informError.innerHTML = "Digite uma url com uma imagem para seu quizz";
    }
    else {
        informError.innerHTML = ''
    }
    if(nOfQuestions == ''){
        nQerror.innerHTML = "Digite quantas perguntas seu quizz terá";
    }
    else {
        nQerror.innerHTML = ''
    }
    if(nOfLevels == ''){
        nLerror.innerHTML = "Digite quantos níveis seu quizz terá";
    }
    else {
        nLerror.innerHTML = ''
    }
    
    if(nameError.innerHTML == '' && informError.innerHTML == '' && nQerror.innerHTML == '' && nLerror.innerHTML == '')
    {
        //console.log('dentro')
        createQuizz = 
        {
            title: quizzName,
            image: quizzImageUrl
        }

        let quizzflow = document.querySelector(".quizz-basics");
        quizzflow.classList.add("hidden");
        quizzflow = document.querySelector(".quizz-questions");
        quizzflow.classList.remove("hidden");
        buildQuestions(nOfQuestions);
        buildLevels(nOfLevels)
    }
    //console.log('fora')
}

function buildQuestions(questions)
{
    numberOFquestions = questions
    main = document.querySelector(".q")
    main.innerHTML = ''

    for (let i = 0; i < questions; i++) {
        main.innerHTML += `
        <div class="q${i+1}">
            <div class="question-fill-guide weight-700 ">Pegunta ${i+1}</div>
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

                    <div class="wrong-answers">
                        <div class="wrong-answer-container">
                            <input class="create-quizz-input question-text needed wrong1" type="text" placeholder="Resposta incorreta 1" onfocusout="checkAnswerText(this)">
                            <div class="error-text-align"><span class="answer-error error-text"></span></div>
                            <input class="create-quizz-input question-bgcolor needed imgWrong1" type="text" placeholder="URL da imagem 1" onfocusout="checkURL(this)">
                            <div class="error-text-align"><span class="url-error error-text"></span></div>
                        </div>

                        <div class="wrong-answer-container">
                            <div class="question-fill-guide weight-700"></div>
                            <input class="create-quizz-input question-text wrong2" type="text" placeholder="Resposta incorreta 2" onfocusout="checkAnswerText(this)">
                            <div class="error-text-align"><span class="answer-error error-text"></span></div>
                            <input class="create-quizz-input question-bgcolor imgWrong2" type="text" placeholder="URL da imagem 2" onfocusout="checkURL(this)">
                            <div class="error-text-align"><span class="url-error error-text"></span></div>
                        </div>

                        <div class="wrong-answer-container">
                            <div class="question-fill-guide weight-700"></div>
                            <input class="create-quizz-input question-text wrong3" type="text" placeholder="Resposta incorreta 3" onfocusout="checkAnswerText(this)">
                            <div class="error-text-align"><span class="answer-error error-text"></span></div>
                            <input class="create-quizz-input question-bgcolor imgWrong3" type="text" placeholder="URL da imagem 3" onfocusout="checkURL(this)">
                            <div class="error-text-align"><span class="url-error error-text"></span></div>
                        </div>
                    </div>
        </div>
        `
        
    }
}

function checkQuestionText(qtInput)
{
    const qtError = qtInput.nextElementSibling;
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
    const colorError = colorInput.nextElementSibling;
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
    let answerError = atInput.nextElementSibling;
    // if(atInput.placeholder == "Resposta correta")
    //     answerError = document.querySelector(".answer-error");
    // else
    // {
    //     for(let i = 1; i < 4; i++)
    //     {
    //         if(atInput.placeholder == `Resposta incorreta-${i}`)
    //             answerError = document.querySelector(`.wa${i}-error`);
    //     }
    // }
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
            console.log('aqui')
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
                    document.querySelector(".quizz-questions").classList.add("hidden")
                    document.querySelector(".Mainlevels").classList.remove("hidden")
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
                    document.querySelector(".quizz-questions").classList.add("hidden")
                    document.querySelector(".Mainlevels").classList.remove("hidden")
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
                    document.querySelector(".quizz-questions").classList.add("hidden")
                    document.querySelector(".Mainlevels").classList.remove("hidden")
                }
            }
        }
    }
    console.log(createQuizz)
}

function buildLevels(number){
    const levels = document.querySelector('.levels')
    levels.innerHTML= ''
    for (let i = 0; i < number; i++) {
        levels.innerHTML += `
        <div class="level">
                <div>nivel ${i+1}</div>
                <input type="text" class="l${i+1}" placeholder="Título do nível">
                <input type="text" class="Porcentl${i+1}" placeholder="% de acerto mínima">
                <input type="text" class="URLl${i+1}" placeholder="URL da imagem do nível">
                <input type="text" class="Textl${i+1}" placeholder="Descrição do nível">
        </div>
        `
    }
    numberOFlevels = number
}

function end (){
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

    console.log(createQuizz)
}