const BOARD_SIZE = 9;
let currentPlayer = 1;

const winnerDisplay = document.querySelector(".winner-display");
const gameBoardElement = document.querySelector(".gameboard");
const menu = document.querySelector(".menu");
const gameArea = document.querySelector(".game-area");
const gameStartButton = document.querySelector(".menu-start");
const playerOneText = document.querySelector(".player-one");
const playerTwoText = document.querySelector(".player-two");

const Player = (name) => {
  let score = 0;

  const getScore = () => {
    return score;
  };

  const incrementScore = () => {
    score += 1;
    return score;
  };

  turn = false;

  return {
    name,
    getScore,
    incrementScore,
    turn,
  };
};

const PlayerOne = Player("Player 1");
const PlayerTwo = Player("Player 2");

const gameBoard = (() => {
  const board = new Array(BOARD_SIZE);

  const getBoard = () => board;

  const setBoardItem = (index, input) => {
    board[index] = input;
  };

  const horizontalCheck = (input) => {
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] === input &&
        board[i + 1] === input &&
        board[i + 2] === input
      ) {
        return true;
      }
    }
    return false;
  };

  const verticalCheck = (input) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i] === input &&
        board[i + 3] === input &&
        board[i + 6] === input
      ) {
        return true;
      }
    }
    return false;
  };

  const diagonalCheck = (input) => {
    if (board[0] === input && board[4] === input && board[8] === input) {
      return true;
    } else if (board[2] === input && board[4] === input && board[6] === input) {
      return true;
    }
    return false;
  };

  const checkGameWinner = (input) => {
    return horizontalCheck(input)
      ? true
      : verticalCheck(input)
      ? true
      : diagonalCheck(input)
      ? true
      : false;
  };

  return {
    getBoard,
    setBoardItem,
    checkGameWinner,
  };
})();

const displayController = ((gameBoard, menu, playerOne, playerTwo) => {
  const { getBoard, setBoardItem, checkGameWinner } = gameBoard;

  const board = getBoard();

  const renderBoard = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      gameBoardElement.appendChild(createGameBoardCell(i));
    }
  };

  const setActivePlayerDisplay = (playerOne, playerTwo) => {
    if (playerOne.turn) {
      playerTwoText.classList.remove("current-player");
      playerOneText.classList.add("current-player");
    } else if (playerTwo.turn) {
      playerOneText.classList.remove("current-player");
      playerTwoText.classList.add("current-player");
    }
  };

  const setPlayerTurn = (playerOne, playerTwo) => {
    if (playerOne.turn) {
      playerOne.turn = false;
      playerTwo.turn = true;
    } else {
      playerOne.turn = true;
      playerTwo.turn = false;
    }
  };

  const markBoardCellEvent = (gameBoardCell) => {
    const index = gameBoardCell.dataset.index;

    gameBoardCell.addEventListener("click", (event) => {
      const value = PlayerOne.turn ? "X" : "O";

      if (winnerDisplay.textContent) {
        return;
      }

      if (!board[index]) {
        setBoardItem(index, value);
        event.target.textContent = value;

        if (checkGameWinner(value)) {
          winnerDisplay.textContent = PlayerOne.turn
            ? `${PlayerOne.name} WIN!`
            : `${PlayerTwo.name} WIN!`;
          return;
        }

        setPlayerTurn(PlayerOne, PlayerTwo);
        setActivePlayerDisplay(PlayerOne, PlayerTwo);
      }
    });
  };

  const createGameBoardCell = (index) => {
    const gameBoardCell = document.createElement("div");
    gameBoardCell.className = "gameboard-cell";
    gameBoardCell.dataset.index = index;
    markBoardCellEvent(gameBoardCell);

    return gameBoardCell;
  };

  const getPlayerNamesFromDisplay = () => {
    const playerNames = document.querySelectorAll(".player-name-input");
    let [playerOneName, playerTwoName] = playerNames;
    PlayerOne.name = playerOneName.value ? playerOneName.value : PlayerOne.name;
    PlayerTwo.name = playerTwoName.value ? playerTwoName.value : PlayerTwo.name;
  };

  const setPlayerNameInDisplay = () => {
    playerOne.textContent = PlayerOne.name;
    playerTwo.textContent = PlayerTwo.name;
  };

  const gameStart = () => {
    console.log("start game");
    menu.className = "hidden";
    gameArea.classList.remove("hidden");
  };

  return {
    renderBoard,
    gameStart,
    getPlayerNamesFromDisplay,
    setPlayerNameInDisplay,
    setPlayerTurn,
    setActivePlayerDisplay,
  };
})(gameBoard, menu, playerOneText, playerTwoText);

displayController.renderBoard([]);

gameStartButton.addEventListener("click", () => {
  displayController.gameStart();
  displayController.getPlayerNamesFromDisplay();
  displayController.setPlayerNameInDisplay();
  displayController.setPlayerTurn(PlayerOne, PlayerTwo);
  displayController.setActivePlayerDisplay(PlayerOne, PlayerTwo);
});
