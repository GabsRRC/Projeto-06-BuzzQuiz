
let quizzes = [];
let conteudo = document.querySelector(".quizzesAPI > ul");
let quizzAtual = {};

function carregarQuizzAPI(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    
    promise.then((response) =>{
        quizzes = response.data;
        conteudo.innerHTML = "";

        for(let i=0; i <= 5; i+=2){
            document.querySelector(".quizzesAPI > ul").innerHTML+=`
            <li class="images"> 
                <div id="${quizzes[i].id}" onclick = "clicarNoQuizz(this)" style="background-image: url('${quizzes[i].image}');">
                    <div class="filtro-degrade">
                        <h4>${quizzes[i].title}</h4>
                    </div>
                </div>
                <div id="${quizzes[i+1].id}" onclick = "clicarNoQuizz(this)" style="background-image: url('${quizzes[i+1].image}');">
                    <div class="filtro-degrade">
                        <h4>${quizzes[i+1].title}</h4>
                    </div>
                </div>
            </li>
            `
        }
    })
}

carregarQuizzAPI();

function clicarNoQuizz(quizz){
    const esconde = document.querySelector(".pagina-um");
    esconde.classList.add("invisivel");
    const mostra = document.querySelector(".pagina-dois");
    mostra.classList.remove("invisivel");

    const quizzId = quizz.getAttribute("id");

    let promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizzId}`)
    
    promise.then(response => {
        quizzAtual = response.data; 

        //adc aqui função do quizz recebido pela API
        renderizarUnicoQuizz();
    })

}


function renderizarUnicoQuizz(){
    document.querySelector(".pagina-dois > div").innerHTML=`
        <ul style="background-image: url(${quizzAtual.image})" class="quizzTitle">
            <h1>${quizzAtual.title}</h1>            
        </ul>
        `
    
    document.querySelector(".quizzBox").innerHTML=`
        <div style="background-color: ${quizzAtual.questions[0].color}" class="quizzQuestion">
            <h1>${quizzAtual.questions[0].title}</h1>
        </div>
    `
    let answersHTML = "";
    const answers = quizzAtual.questions[0].answers;

    for(let i=0; i <= answers.length-1; i++){
        answersHTML += `
        <li class="options" >
            <img src="${answers[i].image}">
            <h1>${answers[i].text}</h1>
        </li>
        `
    }
    
    document.querySelector(".quizzBox").innerHTML+=`
    <ul> 
        ${answersHTML}
    </ul>
    `
    
}






let questionsArray = [];    // Array com as perguntas e as respostas
let levelsArray = [];       // Array com os níveis


// Navegar pelas páginas
function criarQuizz(){
    const esconde = document.querySelector(".pagina-um");
    esconde.classList.add("invisivel");
    const mostra = document.querySelector(".pagina-tres");
    mostra.classList.remove("invisivel");
}

function prosseguirPerguntas(){
    const esconde = document.querySelector(".pagina-tres");
    esconde.classList.add("invisivel");
    const mostra = document.querySelector(".pagina-quatro");
    mostra.classList.remove("invisivel");
}

function definirNiveis(){
    const esconde = document.querySelector(".pagina-quatro");
    esconde.classList.add("invisivel");
    const mostra = document.querySelector(".pagina-cinco");
    mostra.classList.remove("invisivel");
}

function finalizarQuizz(){
    const esconde = document.querySelector(".pagina-cinco");
    esconde.classList.add("invisivel");
    const mostra = document.querySelector(".pagina-seis");
    mostra.classList.remove("invisivel");
}

function reloadPage(){
    window.location.reload();
}

// Verificar se a URL passada é válida
function verificarURL(url){
    const re = new RegExp('^((https?:)?\\/\\/)?'+ // protocol
    '(?:\\S+(?::\\S*)?@)?' + // authentication
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater

    if (re.test(url)) return true;
    else return false;
}

// Verificar se a cor está em formato Hexadecimal
function verificarCor(color){
    const re = new RegExp(/^#[0-9A-Fa-f]{6}$/);

    if(re.test(color)) return true;
    else return false;
}

// Verificar as informações do quizz
let numPerguntas = 0;
let numNiveis = 0;
let quizzTitle = "";
let quizzURL = "";

function verificarQuizzInfo(){
    let  quizzTitleInput = document.querySelector(".quizz-title").value;
    if ( quizzTitleInput.length < 20 ||  quizzTitleInput.length > 65 ) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let quizzURLInput = document.querySelector(".quizz-url").value;
    if (!verificarURL(quizzURLInput)) {
        alert("A imagem deve ser uma URL válida.");
    }
    numPerguntas = parseInt(document.querySelector(".quizz-num-questions").value);
    if (numPerguntas < 3) {
        alert("A quantidade de perguntas deve ser no mínimo 3.");
    }
    numNiveis = parseInt(document.querySelector(".quizz-num-levels").value);
    if (numNiveis < 2) {
        alert("A quantidade de níveis deve ser no mínimo 2.");
    }
    if (( quizzTitleInput.length >= 20 &&  quizzTitleInput.length <= 65) && (verificarURL(quizzURLInput)) && (numPerguntas >= 3) && (numNiveis >= 2)) {
        prosseguirPerguntas();
        criarPerguntas();
    }

    quizzTitle = quizzTitleInput;
    quizzURL = quizzURLInput;
}


// Renderizar perguntas
function criarPerguntas(){
    const questionsDiv = document.querySelector(".createQuestion");

    questionsDiv.innerHTML += `
        <div class="question" style="height: 790px" data-identifier="question">
            <h3>Pergunta 1</h3>
            <div style="padding-top: 20px">
                <input class="question-title" type="text" placeholder="Texto da pergunta"/>
                <input class="question-color" type="text" placeholder="Cor de fundo da pergunta"/>
                <h3>Resposta correta</h3>
                <input class="correct-answer-text" type="text" placeholder="Resposta correta"/>
                <input class="correct-answer-img" type="text" placeholder="URL da imagem"/>
                <h3>Respostas incorretas</h3>
                <div class="incorrect-answers">
                    <div>
                        <input type="text" placeholder="Resposta incorreta 1"/>
                        <input type="text" placeholder="URL da imagem 1"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 2"/>
                        <input type="text" placeholder="URL da imagem 2"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 3"/>
                        <input type="text" placeholder="URL da imagem 3"/>
                    </div>
                </div>
            </div>
        </div>
    `;

    for (let i = 2; i <= numPerguntas; i++) {

        questionsDiv.innerHTML += `
        <div class="question" style="height: 790px" data-identifier="question">
        <h3>Pergunta ${i}</h3>
        <div style="padding-top: 20px">
            <input class="question-title" type="text" placeholder="Texto da pergunta"/>
            <input class="question-color" type="text" placeholder="Cor de fundo da pergunta"/>
            <h3>Resposta correta</h3>
            <input class="correct-answer-text" type="text" placeholder="Resposta correta"/>
            <input class="correct-answer-img" type="text" placeholder="URL da imagem"/>
            <h3>Respostas incorretas</h3>
            <div class="incorrect-answers">
                <div>
                    <input type="text" placeholder="Resposta incorreta 1"/>
                    <input type="text" placeholder="URL da imagem 1"/>
                </div>
                <div>
                    <input type="text" placeholder="Resposta incorreta 2"/>
                    <input type="text" placeholder="URL da imagem 2"/>
                </div>
                <div>
                    <input type="text" placeholder="Resposta incorreta 3"/>
                    <input type="text" placeholder="URL da imagem 3"/>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

//Validar perguntas preenchidas
let questionsArrayCorrect = [];

function verificarPerguntas(){
    const questions = document.querySelectorAll(".question");
    let count = 0;

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if(verificarPergunta(question)){
            questionsArrayCorrect.push(objectQuestion);
            count++; 
        }
    }

    if(count === questions.length){

        definirNiveis();
        criarNiveis();
        correctArray(questionsArrayCorrect, questionsArray, numPerguntas);
    }
}

function randomizar() { 
	return Math.random() - 0.5; 
}

let objectQuestion = {};
function verificarPergunta(question) {   
    const tituloPergunta = question.querySelector(".question-title").value;
    const corPergunta = question.querySelector(".question-color").value;
    const respostaCorretaTexto = question.querySelector(".correct-answer-text").value;
    const respostaCorretaImg = question.querySelector(".correct-answer-img").value;
    const respostasIncorretas = question.querySelector(".incorrect-answers");
    let numRespostasIncorretas = 0;
    let arrayRespostasIncorretas = [];
    let arrayResposta = [];
    let objetoResposta = {};
    let controle = false;

    for (let i = 0; i < respostasIncorretas.children.length; i++) {
        const respostaIncorreta = respostasIncorretas.children[i];
        if(respostaIncorreta.children[0].value !== ""){
            objetoResposta = {
                text: respostaIncorreta.children[0].value,
                image: respostaIncorreta.children[1].value,
                respostaValida: false
            };
            arrayRespostasIncorretas.push(objetoResposta);
            numRespostasIncorretas++;
        }
    }

    for (let i = 0; i < numRespostasIncorretas; i++)
        arrayResposta.push(arrayRespostasIncorretas[i]);

    arrayResposta.push({
        text: respostaCorretaTexto,
        image: respostaCorretaImg,
        respostaValida: true
        }
    );
    
    arrayResposta.sort(randomizar);
    
    if(tituloPergunta.length <= 20){
        alert("Pergunta deve conter no mínimo 20 caracteres");
    }
    else if(!verificarCor(corPergunta)){
        alert("Formato de cor inválido (deve ser hexadecimal)");
    }
    else if(respostaCorretaTexto === ""){
        alert("Campo resposta correta não pode ser vazio");
    }
    else if(!verificarURL(respostaCorretaImg)){
        alert("Formato de URL inválido");
    }
    else if(numRespostasIncorretas === 0){
        alert("Pelo menos uma resposta incorreta deve ser preenchida");
    }
    else{
        objectQuestion = {
            title: tituloPergunta,
            color: corPergunta,
            answers: arrayResposta
        };
        controle = true;
    }
    return controle;
}

// Renderizar níveis
function criarNiveis() {
    const levelsDiv = document.querySelector(".levels");
    levelsDiv.innerHTML += `
        <div class="level createLevels" style="height: 316px" data-identifier="level">
            <h4>Nível 1</h4>
            <div class="level-input" style="padding-top: 15px">
                <input class="quizz-input level-title" type="text" placeholder="Título do nível">
                <input class="quizz-input level-percentage" type="number" placeholder="% de acerto mínima">
                <input class="quizz-input level-url" type="text" placeholder="URL da imagem do nível" >
                <input class="quizz-input level-description" type="text" placeholder="Descrição do nível" >
            </div>
        </div>
    `;

    for (let i = 2; i <= numNiveis; i++) {
        levelsDiv.innerHTML += `
            <div class="level createLevels" data-identifier="level">
                <div>
                    <h4>Nível ${i}</h4>
                </div>
                <div class="level-input">
                    <input class="quizz-input level-title" type="text" placeholder="Título do nível"/>
                    <input class="quizz-input level-percentage" type="number" placeholder="% de acerto mínima"/>
                    <input class="quizz-input level-url" type="text" placeholder="URL da imagem do nível"/>
                    <input class="quizz-input level-description" type="text" placeholder="Descrição do nível"/>
                </div>
            </div>
        `;
    }
}

let isPercentageZero = 0;
let objectLevel = {};
let levelsArrayCorrect = [];

function correctArray(array, newArray, n) {
    let i = array.length - n;
    
    for (i; i < array.length; i++) {
        newArray.push(array[i]);
    }
}


// Validar níveis preenchidos
function verificarNiveis() {
    const levels = document.querySelectorAll(".levels");   
    let count = 0;

    for (let i = 0; i < levels.length ; i++) {
        const level = levels[i];
        if(verificarNivel(level)){
            levelsArrayCorrect.push(objectLevel);
            count++;
        }
    }
    
    if(count === levels.length){
        correctArray(levelsArrayCorrect, levelsArray, numNiveis);
        //finalizarQuizz();
        //enviarQuizz(quizzTitle, quizzURL, questionsArray, levelsArray);
        alert('oi')
    }
}

function verificarNivel(level) {
    const levelTitle = level.querySelector(".level-title").value;
    const levelPercentage = parseInt(level.querySelector(".level-percentage").value);
    const levelUrl = level.querySelector(".level-url").value;    
    const levelDescription = level.querySelector(".level-description").value;    
    let control = false;
    
    if(levelPercentage === 0){
        isPercentageZero++;
    }

    if(levelTitle.length < 10){
        alert("O título da pergunta deve ter, no mínimo, 10 caracteres");
    }
    else if(levelPercentage < 0 || levelPercentage > 100){
        alert("Porcentagem com número inválido");
    }
    else if(!verificarURL(levelUrl)){
        alert("Formato de URL inválido");
    }
    else if(levelDescription.length < 30){
        alert("Descrição do nível deve conter, no mínimo, 30 caracteres");
    }
    else if(isPercentageZero === 0){
        alert("Deve haver uma porcentagem com 0(zero)");
    }
    else{
        objectLevel = {
            title: levelTitle,
            image: levelUrl,
            text: levelDescription,
            minValue: levelPercentage
        }
        control = true;
    }
    return control;
}


//Enviar quizz para API

function enviarQuizz(title, image, questions, levels){
    const object = {
        title,
        image,
        questions,
        levels
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', object);
    promise.then(alert('foi'));
    promise.catch(alert('xiii'))
}








