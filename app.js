/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the die as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var activePlayer, score, roundScore, dice1, dice2, dice, gamePlay;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlay){
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    dice = dice1 + dice2;
    
    if(dice1 == 1 || dice2 ==1 ){
      nextPlayer();
    }else{
      roundScore += dice;
      document.getElementById('current-' +activePlayer).textContent = roundScore;
      document.querySelector('.dice1').style.display = 'block';
      document.querySelector('.dice2').style.display = 'block';
      document.querySelector('.dice1').src='dice-' + dice1 + '.png';
      document.querySelector('.dice2').src='dice-' + dice2 + '.png';
    }
  }
 
  
})

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlay){
    var setPoint, target;
    score[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

    setPoint = document.getElementById("target").value;
    console.log(setPoint)
    if(setPoint){
      target = setPoint;
    }else{
      target = '100';
    }
//Winning of the game when a player reaches the set Point
    if(score[activePlayer] >= target){
      gamePlay = false;
      document.querySelector('#name-'+activePlayer).textContent = 'Winner';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer+ '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer+ '-panel').classList.remove('active');
    }else{
      nextPlayer();
    }
  }
  

})

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
  gamePlay = true;
  activePlayer = 0;
  score = [0, 0];
  roundScore = 0;
  setPoint = 100;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

