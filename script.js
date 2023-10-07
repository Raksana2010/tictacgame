let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const board = document.getElementById("board");
const message = document.getElementById("message");

function makeMove(index) {
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        board.children[index].textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            gameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            return;
        }
    }
    if (!gameBoard.includes("")) {
        gameActive = false;
        message.textContent = "It's a tie!";
    }
}

function resetBoard() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    message.textContent = "";
    board.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
}

board.querySelectorAll(".cell").forEach(cell =>
    cell.addEventListener("click", () => makeMove([...board.children].indexOf(cell)))
);

resetBoard();
