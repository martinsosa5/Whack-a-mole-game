// selecciona (captura) el contenedor principal del juego y todos los elementos de los "items" (casilla de juegos)

const gameContainer = document.querySelector(".container"); // capturo la clase container
const allMoleItems = document.querySelectorAll(".item"); // caputuro TODOS los "item"

// Carga los sonidos: el sonido del golpe (Whack) y la musica de fondo
const whackSound = new Audio('/sound/whack.mp3');
const backgroundMusic = new Audio('/sound/music.mp3');
backgroundMusic.loop = true; //configura par que se repita automaticamente
backgroundMusic.volume = 0.3;

// Variables para gestionar el juego
let startGame, startTime;
let countDown = 20;
let score = 0;

// Elemntos HTML donde se muestran el tiempo y el puntaje
const timeCount = document.getElementById('time-count');
const scoreCount = document.getElementById('score-count');

// Botones para iniciar y reiniciar el juego
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');

// Evento que se activa al hacer clic en el boton de inicio
startButton.addEventListener("click", () =>{
    startGameLogic();
    startButton.style.display = "none";
    restartButton.style.display = "none";
    backgroundMusic.play(); 
}); // al hacer click en el boton se ejecuta lo que esta dentro de la funcion flecha

// Evento que se activa al hacer clic en el boton de reinicio
restartButton.addEventListener("click", () =>{
    resetGame();
    startButton.style.dominantBaseline = "block";
    restartButton.style.display = "none";
});

// acá pregunto si el evento "e" tiene la clase mole.clicked significa que si le hice click al mole

// Evento para detectar clics dentro del contenedor del juego
gameContainer.addEventListener("click", (e) =>{
    // verifica si el click ocurrio en un topo
    //pregunto si el evento "e" tiene la clase mole.clicked significa que si le hice click al mole
    if(e.target.classList.contains("mole-clicked")){
        whackSound.currentTime = 0; // reinicia el sonido del golpe si es que ya se estaba reproduciendo
        whackSound.play(); // reproduce el sonido del golpe

        score++; // incrementa el score
        scoreCount.innerHTML = score; // actualiza el puntaje en la pantalla

        // muestra el texto animado donde haya ocurrido el click
        const bushElement = e.target.parentElement.previousElementSibling;
         /* Este metodo selecciona el hermano anterior en el arbol DOM desde el elemento padre(parentElement).
         En este contexto, se asume que el arbusto (o la ubicacion donde debe mostrarse el texto) es el
         elemento hermano que esta justo antes del topo en el DOM. */
        let textElement = document.createElement("span");
        textElement.setAttribute("class", "whack-text");
        textElement.innerHTML = "Whack!";
        bushElement.appendChild(textElement); //agregamos el texto creado en la variable textElement

        //eliminar el texto "whack!" despues de 300 milisegundos
        setTimeout(()=>{
            textElement.remove();
        }, 300);
    }
});


//Logica para iniciar el juego
function startGameLogic(){
    countDown = 20; //reinicia el contador del tiempo
    score = 0; // reinicia el puntaje

    scoreCount.innerHTML = score;
    timeCount.innerHTML = countDown;

    //Configura un intervalo que decrementa el contador de tiempo cada segundo
    startTime = setInterval(()=>{
        timeCount.innerHTML = countDown;
        countDown--;
        if(countDown < 0){
            endGame();
        }
    },1000)

    //Configura otro intervalo que hace aparecer a los topos cada 600 milisigundos
    startGame = setInterval(() =>{
        showMole();
    },600);

}

// Funcion que termina el juego

function endGame(){
    clearInterval(startGame); // detiene el intervalo de aparicion de los topos
    clearInterval(startTime); // detiene el intervalo de decremento del tiempo
    timeCount.innerHTML = "0";
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; //Reinicia la musica para el proximo juego
    restartButton.style.display = "block"; // muestra el boton de reinicio
}

// Funcion que reinicia el juego
function resetGame(){
    countDown = 20;
    score = 0;
    scoreCount.innerHTML = score;
    timeCount.innerHTML = countDown;

    clearInterval(startTime);
    clearInterval(startGame);

    // Asegura que todos los topos esten ocultos
    allMoleItems.forEach((item =>{
        const mole = item.querySelector(".mole");
        mole.classList.remove("mole-appear");
    }))
}

// Funcion que muestra un topo al azar
function showMole() {
    if(countDown <= 0){
        return;
    }

    let moleToAppear = allMoleItems[getRandomValue()].querySelector(".mole");
    moleToAppear.classList.add("mole-appear");
    hideMole(moleToAppear); // esta funcion configura la desaparicion del mole
}

// Genera un indice aleatorio para seleccioar un topo
function getRandomValue(){
    let rand = Math.random() * allMoleItems.length;
    return Math.floor(rand); //me devuelve un valor entero
}

// Hace que el topo desaparezca despues de 1 segundo
function hideMole(moleItem){
    setTimeout(()=>{
        moleItem.classList.remove("mole-appear");
    },1000);
}