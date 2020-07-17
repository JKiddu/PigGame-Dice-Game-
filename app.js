
var globalScores, scorePerRound, activePlayer, diceImage, gameRunning, previousScore;

gameStart();
diceImage = document.querySelector('.dice');

function gameStart(){
    globalScores = [0,0];
    scorePerRound = 0;
    activePlayer = 0;
    gameRunning = true;
    previousScore  = 0;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function playerSwitch(){

    previousScore = 0;
    // Change active player.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    //Reset scorePerRound.
    scorePerRound = 0;

    //Make current score 0.
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Hide the dice Image so that other player start fresh.
    diceImage.style.display = 'none';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameRunning){
        //1. Generate random number.
        var diceNumber = Math.ceil(Math.random() * 6);
        console.log("previous: " + previousScore); 
        console.log("current: " + diceNumber);
             
        //2. Display the dice.
        diceImage.style.display = 'block';
        diceImage.src = 'dice-' + diceNumber + '.png';

        //3. Update the score if NOT equal to 1.
        if (diceNumber !== 1 && (previousScore != 6 || diceNumber !=6)){
            scorePerRound += diceNumber;
            document.querySelector('#current-' + activePlayer).textContent = scorePerRound;
            previousScore = diceNumber;
        } else {
            //Player Switch           
            playerSwitch();
            
        }

        
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gameRunning){
        //Add Score to global scores.
        globalScores[activePlayer] += scorePerRound;

        //Show the updated score to the UI.
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];

        //Check if player wins.
        if (globalScores[activePlayer] >= 10){
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gameRunning = false;
        } else{
            //Player Switch
            playerSwitch();
        }
        }
});

document.querySelector('.btn-new').addEventListener('click', gameStart);