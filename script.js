let quizzes = [];
let conteudo = document.querySelector(".quizzesAPI > ul");

function carregarQuizzAPI(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    
    promise.then((response) =>{
        quizzes = response.data;
        conteudo.innerHTML = "";

        for(let i=0; i <= 5; i+=2){
            document.querySelector(".quizzesAPI > ul").innerHTML+=`
            <li class="images"> 
                <div style="background-image: url('${quizzes[i].image}');">
                    <div class="filtro-degrade">
                        <h4>${quizzes[i].title}</h4>
                    </div>
                </div>
                <div style="background-image: url('${quizzes[i+1].image}');">
                    <div class="filtro-degrade">
                        <h4>${quizzes[i+1].title}</h4>
                    </div>
                </div>
            </li>
            `
        }


     //falta terminar

    })
}

carregarQuizzAPI()




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

function reloadPage(){
    window.location.reload();
}

// Verifica se a URL passada é válida
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

// Verifica se a cor está em formato Hexadecimal
function verificarCor(color){
    const re = new RegExp(/^#[0-9A-Fa-f]{6}$/);

    if(re.test(color)) return true;
    else return false;
}

// Verifica as informações do quiz
let numPerguntas = 0;

function verificarQuizzInfo(){
    let tituloQuizz = document.querySelector(".quizz-title").value;
    if (tituloQuizz.length < 20) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".quizz-url").value;
    if (!verificarURL(imagemQuizz)) {
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
    if ((tituloQuizz.length >= 20) && (verificarURL(imagemQuizz)) && (numPerguntas >= 3) && (numNiveis >= 2)) {
        prosseguirPerguntas();
        criarPerguntas();
    }
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
        correctArray(questionsArrayCorrect, questionsArray, numberOfQuestions);
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
    
    if(tituloPergunta.length < 20){
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


//Criar níveis
function criarNiveis(){

}

//Validar níveis
function validarNiveis(){

}