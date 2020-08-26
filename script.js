let home = document.querySelector('.home');
let game = document.querySelector('.game');
let nombreAleatoire = 0;
let interval;
let compteur = 0;
let lotCarte = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
let listeCartePose = []; 
let score = 0;

function effacerHome(){
    home.style.display = 'none';
    game.style.display = 'flex';
}

function returnHome(){
    document.getElementById('time').value = null;
    location.reload();
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
    // changeCarte();
    interval = setInterval(changeCarte, document.getElementById('time').value);
    afficheBtnStop();
}

function choixCarte(){
    nombreAleatoire = genererNombreEntier(lotCarte.length);
    document.getElementById("carte").src = `./images/${lotCarte[nombreAleatoire]}.png`;
    listeCartePose.push(lotCarte[nombreAleatoire]);
    lotCarte.splice(nombreAleatoire, 1);
    calculScore();
    if(lotCarte.length === 0){
        clearInterval(interval);
        setTimeout(endCarte,1000);
        document.getElementById('btnStop').style.display = 'none';
        document.getElementById('btnRetry').style.display = 'block';
    }
}

function endCarte(){
    const textEnd = document.createElement('h1');
    textEnd.textContent = "Il n'y a plus de carte disponible :)";
    textEnd.style.marginLeft = '-30%';
    document.querySelector(".tableGame").appendChild(textEnd);
}

function afficheBtnStop(){
    document.getElementById('btnGo').style.display = 'none';
    document.getElementById('btnStop').style.display = 'block';
}

function stop(){
    clearInterval(interval);
    document.getElementById('btnStop').style.display = 'none';
    document.getElementById('btnRetry').style.display = 'block';
    if(lotCarte.length>0){
        setTimeout(afficherScore,1000);
    }
}

function afficherScore(){
    const infoScore = document.createElement('h1');
    infoScore.textContent = `Le nombre d'oeuf disponible est de ${score}`;
    infoScore.style.marginLeft = '-30%';
    document.querySelector(".tableGame").appendChild(infoScore);
}

function retry(){
    lotCarte = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
    listeCartePose = [];
    score = 0;
    document.getElementById('btnRetry').style.display = 'none';
    document.getElementById('btnGo').style.display = 'block';
    document.querySelector('.tableGame').innerHTML='';
}

function calculScore(){
    let pouletLength = listeCartePose.filter(function(value){return value === 0;}).length;
    let renardLength = listeCartePose.filter(function(value){return value === 1;}).length;
    let oeufLength = listeCartePose.filter(function(value){return value === 2;}).length;
    if(lotCarte[nombreAleatoire] === 2){
        score++
    };
    if(lotCarte[nombreAleatoire] === 0 && oeufLength > 0){
        score--
    }
    if(lotCarte[nombreAleatoire] === 1 && pouletLength > 0 && oeufLength >= pouletLength){
        score++
    }
}