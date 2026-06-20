const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontals
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticals
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !isGameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = "Player " +  currentPlayer + "'s Win🎉";
        isGameActive = false;
        highlightWinners(winningLine);
        updateScore();
        return;
    }
    if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🫱🏽‍🫲🏼";
        isGameActive = false;
        return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = "Player " + currentPlayer + "'s turn";
}

function highlightWinners(line) {
    line.forEach(index => cells[index].classList.add('winner'));
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXText.textContent = scoreX;
    } else {
        scoreO++;
        scoreOText.textContent = scoreO;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = "Player " + currentPlayer + "'s turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });
}

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);