// This is the const we will use to change the display to match who's turn it is or the match result
const statusDisplay = document.querySelector('.game-status');
const playerOneScore = document.querySelector('.player-one');
const playerTwoScore = document.querySelector('.player-two');

/* The below sets the game to active, sets the current player who will start the game and also sets our array to null as 
this will change during the game depending on what each player clicks */
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];


/* Below sets the start score for each player. It also sets the amount to a display function and then changes the HTML to 
display the current score of each player */
let playerOne = 0;
let playerTwo = 0;

const playerOneScoreDisplay = () => `Player X: ${playerOne}`;
const playerTwoScoreDisplay = () => `Player O: ${playerTwo}`;

playerOneScore.innerHTML = playerOneScoreDisplay();
playerTwoScore.innerHTML = playerTwoScoreDisplay();




// Sets the way in which the players can win
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/* Below sets the messages that will be displayed above our game board. They will show which players turn it is and then
who has won the game once completed or draw if thats the result */
const winningMessage = () => `Congrats, Player ${currentPlayer} has won! Click restart for a rematch.`;
const drawMessage = () => `Game ended in a draw! Click restart for a rematch.`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();


// functions that will be used throughout the game
function CellPlayed() {

}

function PlayerChange() {

}

function result() {

}

function CellClick() {

}

function RestartGame() {

}

// An event listener for the mouse click of each square on the game board
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));

// An event listener for if the user has clicked the restart button
document.querySelector('.game-restart').addEventListener('click', RestartGame);

// An event listener for if the user has clicked change player
document.querySelector('.change-player').addEventListener('click', PlayerChange);



// This function checks which square the user has clicked on the game board. It then runs the cellPlayed function
function CellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    CellPlayed(clickedCell, clickedCellIndex);
    result();
}



// This function fills out the cell that the user has selected with their player icon
function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (currentPlayer == "X") {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "yellow";
    } else {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "red";
    }
}



// This function checks the result and then runs the correct function depending on that result
function result() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;

        if (currentPlayer == 'X') {
            playerOne++;
            playerOneScore.innerHTML = playerOneScoreDisplay();
        }

        if (currentPlayer == 'O') {
            playerTwo++;
            playerTwoScore.innerHTML = playerTwoScoreDisplay();
        }

        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    PlayerChange();
}


// This is the player change function which changes the player after each turn
function PlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


// This function will restart the game if the restart button is clicked
function RestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}