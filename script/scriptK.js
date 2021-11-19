const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promisse.then((answer)=>{
    const quizzes = document.querySelector('.quizzes')

    quizzes.innerHTML = ''
    for (let i=0; i<answer.data.length; i++){
        quizzes.innerHTML += `
        <div class="quizz">
            <p>${answer.data[i].title}</p>
        </div>
        `
        quizzes.lastElementChild.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url("${answer.data[i].image}")`
        quizzes.lastElementChild.style.backgroundSize = 'contain, cover' // 100% 100% contain, cover
        console.log(quizzes.lastElementChild)
        console.dir(quizzes.lastElementChild)
        
    }
    // console.log(document.querySelectorAll('.quizzes .quizz'))
    // console.dir(document.querySelector('.quizzes .quizz'))
})
promisse.catch(()=>console.log('erro'))
