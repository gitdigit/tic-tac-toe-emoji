const btn = document.getElementById('btn');
const player_emoji = '😁';
const robot_emoji = '🤖';

let turn;
const board = document.querySelector('.box'); 
const cells = document.querySelectorAll('.cell'); 
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.addEventListener('DOMContentLoaded', () => {
    startGame();
     document.getElementById('restartBtn').addEventListener('click', () => {
         document.querySelector('.container').style.display = 'none';
         document.querySelector('.form-box').style.display = 'block';
         startGame();
     });
 
     document.getElementById('homeBtn').addEventListener('click', () => {
         window.location.href = 'home.html'; 
     });
 });
 

function startGame() {
    turn = false;
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove(player_emoji);
        cell.classList.remove(robot_emoji);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    
    leftClick(); 
}

function setBoardHoverClass() {
    board.classList.remove(player_emoji);
    board.classList.remove(robot_emoji);
    if (turn) {
        board.classList.add(robot_emoji);
    } else {
        board.classList.add(player_emoji);
    }
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = turn ? robot_emoji : player_emoji;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
}

function checkWin(currentClass) {
    return win_combinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentClass;
        });
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${turn ? "🤖" : "😁"} Wins!`;
    }
    winningMessageElement.classList.add('show');
    document.querySelector('.form-box').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    winningMessageTextElement.style.fontSize = "2rem";
}


function isDraw() {
    return [...cells].every(cell => {
        return cell.innerText === player_emoji || cell.innerText === robot_emoji;
    });
}

function swapTurns() {
    turn = !turn;
   
    if (turn) {
        rightClick(); 
    } else {
        leftClick(); 
    }
}

function leftClick() {
    btn.style.left = '10px'; 
}

function rightClick() {
    btn.style.left = '245px'; 
}
