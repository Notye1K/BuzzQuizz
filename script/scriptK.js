const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promisse.then((answer)=>{
    const quizzes = document.querySelector('.quizzes')
    const containerMyQuizzes = document.querySelector('.containerMyQuizzes')


    let arraId = []
    if (localStorage.getItem("id") !== null) {
        let id = JSON.parse(localStorage.getItem("id"))
        for (let i = 0; i < id.length; i++) {
            arraId.push(id[i].id)
        }
    }

    containerMyQuizzes.innerHTML = ''
    quizzes.innerHTML = ''
    for (let i=0; i<answer.data.length; i++){
        if (arraId.includes(answer.data[i].id)) {
            document.querySelector('.noQuizz').classList.add('displayNone')
            document.querySelector('.withQuizz').classList.remove('displayNone')

            containerMyQuizzes.innerHTML += `
            <div data-identifier="quizz-card user-quizzes" class="quizz user-quizz" id="${answer.data[i].id}" onclick="insideQuizz(${answer.data[i].id})">
                <p>${answer.data[i].title}</p>
                <div class="manage-rectangle flex flex-column">
                    <img class="pen-edit" src="/BuzzQuizz/assets/pen.png" alt="click to edit" onclick="editQuizz(this)">
                    <img class="trash-delete" src="/BuzzQuizz/assets/trash.png" alt="click to delete" onclick="deleteQuizz(this)">
                </div>
            </div>
            `
            containerMyQuizzes.lastElementChild.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url("${answer.data[i].image}")`
            containerMyQuizzes.lastElementChild.style.backgroundSize = 'contain, cover' // 100% 100% contain, cover
            console.log(answer.data[i])
            console.log(answer.data)
            console.log(arraId)
            
        }
        else{
            quizzes.innerHTML += `
            <div data-identifier="general-quizzes quizz-card" class="quizz" onclick="insideQuizz(${answer.data[i].id})">
                <p>${answer.data[i].title}</p>
            </div>
            `
            quizzes.lastElementChild.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url("${answer.data[i].image}")`
            quizzes.lastElementChild.style.backgroundSize = 'contain, cover' // 100% 100% contain, cover
        }
        // console.log(quizzes.lastElementChild)
        // console.dir(quizzes.lastElementChild)
        
    }
    // console.log(document.querySelectorAll('.quizzes .quizz'))
    // console.dir(document.querySelector('.quizzes .quizz'))
})
promisse.catch(()=>console.log('erro'))

function insideQuizz (id) {
    ID = id
    couter = 0
    pontuation = 0
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promisse.then((answer)=>{
        levels = answer.data.levels

        document.querySelector('.insideQuizz').classList.remove('displayNone')
        document.querySelector('main').classList.add('displayNone')
        document.querySelector('.finalScreenQuizz').classList.add('displayNone')

        const header = document.querySelector('.insideQuizz header')
        header.innerHTML = answer.data.title
        header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${answer.data.image}")`
        header.style.backgroundSize = 'contain, cover'

        let questions = answer.data.questions
        questions.sort(comparador)
        let AllQuestions = document.querySelector('.allQuestions')
        AllQuestions.innerHTML = ""
        for (let i = 0; i < questions.length; i++) {
            // console.log(questions[i])
            // console.log(questions[i].answers)
            questions[i].answers.sort(comparador)
            AllQuestions.innerHTML +=
            `<section class="containerQuestion">
                <div data-identifier="question" class="question">${questions[i].title}</div>
                <div class="answers">

                </div>
            </section>`
            // console.log(AllQuestions.lastElementChild.querySelector('.question'))
            AllQuestions.lastElementChild.querySelector('.question').style.background = questions[i].color
            let AllAnswers = AllQuestions.lastElementChild.querySelector('.answers')

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].isCorrectAnswer){
                    AllAnswers.innerHTML += 
                    `
                    <div data-identifier="answer" class="answer" onclick='isCorrectAnswer(${questions[i].answers[j].isCorrectAnswer}, this)'>
                        <img src="${questions[i].answers[j].image}" alt="">
                        <h1 class="right">${questions[i].answers[j].text}</h1>
                    </div>
                    `
                }
                else {
                    AllAnswers.innerHTML += 
                    `
                    <div class="answer" onclick='isCorrectAnswer(${questions[i].answers[j].isCorrectAnswer}, this)'>
                        <img src="${questions[i].answers[j].image}" alt="">
                        <h1>${questions[i].answers[j].text}</h1>
                    </div>
                    `
                }
            }

            
        }
 

        header.scrollIntoView(true)
        //window.scroll(0,0)
    })
}

function isCorrectAnswer(answer,element){
    couter ++
    if (answer){
        pontuation ++
        const answers = element.parentElement.querySelectorAll('.answer')
        for (let i = 0; i < answers.length; i++) {
            answers[i].querySelector('h1').style.color = '#FF4B4B'
            answers[i].style.opacity = '0.3'

            answers[i].onclick = null
        }
        element.querySelector('h1').style.color = '#009C22'
        element.style.opacity = '1'
    }
    else {
        const answers = element.parentElement.querySelectorAll('.answer')
        for (let i = 0; i < answers.length; i++) {
            answers[i].querySelector('h1').style.color = '#FF4B4B'
            answers[i].style.opacity = '0.3'

            answers[i].onclick = null
        }
        element.querySelector('h1').style.color = '#FF4B4B'
        element.style.opacity = '1'
        element.parentElement.querySelector('.right').style.color = '#009C22'
    }
    if(couter === document.querySelectorAll('.containerQuestion').length){
        const finalScreen = document.querySelector('.finalScreen')

        finalScreen.classList.remove('displayNone')
        setTimeout(()=>{finalScreen.scrollIntoView(true)},2000)

        let porcent = Math.round(pontuation/document.querySelectorAll('.containerQuestion').length*100)
        let title
        let image
        let text

        for (let i = 0; i < levels.length; i++) {
            if (porcent > levels[i].minValue) {
                title = levels[i].title
                image = levels[i].image
                text = levels[i].text
            }            
        }
        
        finalScreen.querySelector('.title').innerHTML = `${porcent}% de acerto: ${title}`
        finalScreen.querySelector('img').src = image
        finalScreen.querySelector('p').innerHTML = text

    }
    setTimeout(()=>{element.parentElement.parentElement.nextElementSibling.scrollIntoView(true)},2000)
}

function restart (){
    insideQuizz (ID)
}

function home (){
    location.reload()
    // document.querySelector('main').scrollIntoView(true)
}

function comparador() { 
	return Math.random() - 0.5; 
}

let couter = 0
let pontuation = 0
let levels
let ID

function myquizz() {
    document.querySelector('main').classList.add('displayNone')
    document.querySelector('.main').classList.remove('displayNone')
}
//falta -- data-identifier="user-quizzes" -- data-identifier="quizz-card" -- Tela de cria????o de quizz

function editQuizz(image)
{
    
}

function deleteQuizz(image)
{
    const quizzToDelete = image.parentElement.parentElement.id;
    const delete = axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzToDelete}`, Secret-Key)

/*<div data-identifier="quizz-card user-quizzes" class="quizz user-quizz" onclick="insideQuizz(${answer.data[i].id})">
                <p>${answer.data[i].title}</p>
                <div class="manage-rectangle flex flex-column">
                    <img class="pen-edit" src="/BuzzQuizz/assets/pen.png" alt="click to edit" onclick="editQuizz(this)">
                    <img class="trash-delete" src="/BuzzQuizz/assets/trash.png" alt="click to delete" onclick="deleteQuizz(this)">
                </div>
            </div>*/
}