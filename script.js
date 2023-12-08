const playerMoveFirst = Math.floor(Math.random() * 2);
const gameStatus = document.getElementById("gameStatus");
let currentPlayer = 1;

function randomPlayerStart() {
    currentPlayer = playerMoveFirst + 1;
}

randomPlayerStart();

function makeMove(row, col) {
    const cellId = `cell${row}${col}`;
    const cell = document.getElementById(cellId);
    let symbol;
    if (cell.innerText == '') {
        if (currentPlayer == 1) {
            symbol = '0';
            currentPlayer = 2;
        } else {
            symbol = 'X';
            currentPlayer = 1;
        } 
        cell.innerHTML = symbol;
    }
    gameStatus.classList.add('game-status');
    if (checkBoard()) {
        gameStatus.textContent = "Winner: Player " + (3 - currentPlayer);
    }
    if (!checkBoard() && checkDraw()) {
        gameStatus.textContent = "Draw";
    }
    alert (cellCount);
}

function checkCells(cells) {
    return cells.every(cell => cell.innerText != '' && cell.innerText == cells[0].innerText);
}

function checkBoard() {
    let mainDiag = [];
    let secDiag = [];
    for (let i = 0; i < 3; ++i) {
        let row = [];
        let col = [];
        for (let j = 0; j < 3; ++j) {
            let rowCellId = `cell${i}${j}`;
            let colCellId = `cell${j}${i}`;
            row[j] = document.getElementById(rowCellId);
            col[j] = document.getElementById(colCellId);
        }
        let mainDiagId = `cell${i}${i}`;
        let secDiagId = `cell${i}${1 - i + 1}`;
        mainDiag[i] = document.getElementById(mainDiagId);
        secDiag[i] = document.getElementById(secDiagId);
        if (checkCells(row) || checkCells(col)) {
            return true;
        }
    }
    if (checkCells(mainDiag) || checkCells(secDiag)) {
        return true;
    }
    return false;
}

function checkDraw() {
    let cellCount = 0;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            let cellId = `cell${i}${j}`;
            let cell = document.getElementById(cellId);
            if (cell.innerHTML != '') {
                ++cellCount;
            }
        }
    }
    if (cellCount == 9) {
        return true;
    }
}

function restart() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            let cellId = `cell${i}${j}`;
            let cell = document.getElementById(cellId);
            cell.innerHTML = '';
        }
    }
    gameStatus.textContent = "";
}



