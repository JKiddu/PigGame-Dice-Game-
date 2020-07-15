/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var globalScores, scorePerRound, activePlayer, diceImage, gameRunning;

gameStart();
diceImage = document.querySelector('.dice');

function gameStart(){
    globalScores = [0,0];
    scorePerRound = 0;
    activePlayer = 0;
    gameRunning = true;
    
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
        
        //2. Display the dice.
        diceImage.style.display = 'block';
        diceImage.src = 'dice-' + diceNumber + '.png';

        //3. Update the score if NOT equal to 1.
        if (diceNumber !== 1){
            scorePerRound += diceNumber;
            document.querySelector('#current-' + activePlayer).textContent = scorePerRound;
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