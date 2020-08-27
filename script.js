let home = document.querySelector('.home');
let game = document.querySelector('.game');
let nombreAleatoire = 0;
let interval;
let compteur = 0;
let lotCarte = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
let listeCartePose = [];
let oeufCouve = [];
let oeufDispo = []; 
let score = 0;
let speed;
let messageWinner = `
    <div class="winner">
        <p>BRAVO</p>
    </div>
`;
let messageEndCarte = `
    <div class="omelette">
    </div>
`;

function effacerHome(){
    home.style.display = 'none';
    game.style.display = 'flex';
}

function returnHome(){
    location.reload();
}

function choiceSpeed(){
    if(document.getElementById('level').value == 'level1'){
        speed = 1300;
    }
    else if(document.getElementById('level').value == 'level2'){
        speed = 1000;
    }
    else if(document.getElementById('level').value == 'level3'){
        speed = 700
    }
}

function genererNombreEntier(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function changeCarte(){
    let tableGame = document.querySelector('.tableGame');
    if(tableGame.children.length > 0){
        tableGame.removeChild(tableGame.lastChild);
    };
    const newImg = document.createElement('img');
    newImg.setAttribute('id','carte');
    newImg.classList.add('carte_out');
    document.querySelector(".tableGame").appendChild(newImg);
    choixCarte();
}

function go(){
    choiceSpeed();
    interval = setInterval(changeCarte, speed);
    afficheBtnStop();
}

function choixCarte(){
    nombreAleatoire = genererNombreEntier(lotCarte.length);
    document.getElementById("carte").src = `./images/${lotCarte[nombreAleatoire]}.png`;
    listeCartePose.push(lotCarte[nombreAleatoire]);
    lotCarte.splice(nombreAleatoire, 1);
    if(lotCarte.length === 0){
        clearInterval(interval);
        setTimeout(endCarte,800);
        document.getElementById('btnStop').style.display = 'none';
        document.getElementById('btnRetry').style.display = 'block';
    }
}

function endCarte(){
    document.querySelector('.tableGame').innerHTML='';
    document.querySelector('.tableGame').innerHTML = messageEndCarte;
}

function afficheBtnStop(){
    document.getElementById('btnGo').style.display = 'none';
    document.getElementById('btnStop').style.display = 'block';
}

function stop(){
    calculScore();
    clearInterval(interval);
    document.querySelector('.tableGame').innerHTML='';
    document.getElementById('btnStop').style.display = 'none';
    document.getElementById('btnRetry').style.display = 'block';
    if(lotCarte.length>0){
        setTimeout(afficherScore,500);
    }
}

function afficherScore(){
    if(score != 5){
        document.querySelector(".tableGame").innerHTML = `
            <div class="omelette">
                <p id="textGameOver">Dommage :( <br><span id="score">${score}</span> <br>Oeufs Dispo</p>
            </div>
        `;
    }
    else{
        document.querySelector('.tableGame').innerHTML = messageWinner;
    }
    
}

function retry(){
    lotCarte = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
    listeCartePose = [];
    oeufCouve = [];
    oeufDispo = []; 
    score = 0;
    document.getElementById('btnRetry').style.display = 'none';
    document.getElementById('btnGo').style.display = 'block';
    document.querySelector('.tableGame').innerHTML = "";
}

function calculScore(){
    for(let i = 0 ; i < listeCartePose.length; i++){
        if(listeCartePose[i] === 0){
            if(oeufDispo.length > 0 && score > 0){
                oeufCouve.push('X');
                score--;
            }
            else if(oeufDispo.length > 0){
                oeufCouve.push('X');
            }
        }
        else if(listeCartePose[i] === 1){
            if(oeufCouve.length > 0){
                oeufCouve.splice(0,1);
                score++;
            }
        }
        else if(listeCartePose[i] === 2){
            oeufDispo.push('X');
            score++
        }
    }
}