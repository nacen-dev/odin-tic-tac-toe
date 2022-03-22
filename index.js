let currentPlayer = 1;

const winnerDisplay = document.querySelector(".winner-display");
const gameBoardElement = document.querySelector(".gameboard");
const menu = document.querySelector(".menu");
const gameArea = document.querySelector(".game-area");
const gameStartButton = document.querySelector(".menu-start");
const playerOneText = document.querySelector(".player-one");
const playerTwoText = document.querySelector(".player-two");
const playerOneScore = document.querySelector(".player-one-score");
const playerTwoScore = document.querySelector(".player-two-score");
const playAgainButton = document.querySelector(".game-play-again");
const gameRestartButton = document.querySelector(".game-restart");

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

  const resetScore = () => {
    score = 0;
  };

  return {
    name,
    getScore,
    incrementScore,
    turn,
    resetScore,
  };
};

const PlayerOne = Player("Player 1");
const PlayerTwo = Player("Player 2");

const gameBoard = (() => {
  const BOARD_SIZE = 9;

  let board = new Array(BOARD_SIZE);
  board.fill(null);

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

  const checkIfDraw = () => {
    return board.every((boardCell) => {
      if (boardCell) return boardCell;
    });
  };

  const resetBoard = () => {
    board = board.map((boardItem) => null);
  };

  return {
    getBoard,
    setBoardItem,
    checkGameWinner,
    BOARD_SIZE,
    resetBoard,
    checkIfDraw,
  };
})();

const displayController = ((
  gameBoard,
  menu,
  playerOneElement,
  playerTwoElement
) => {
  const { getBoard, setBoardItem, checkGameWinner } = gameBoard;

  const renderBoard = () => {
    for (let i = 0; i < gameBoard.BOARD_SIZE; i++) {
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

  const resetPlayerTurn = (playerOne, playerTwo) => {
    playerOne.turn = true;
    playerTwo.turn = false;
  };

  const setScore = () => {
    if (PlayerOne.turn) {
      PlayerOne.incrementScore();
    } else if (PlayerTwo.turn) {
      PlayerTwo.incrementScore();
    }
  };

  const setScoreInDisplay = () => {
    playerOneScore.textContent = `${PlayerOne.name}'s Score: ${
      PlayerOne.getScore() ? PlayerOne.getScore() : 0
    }`;
    playerTwoScore.textContent = `${PlayerTwo.name}'s Score: ${
      PlayerTwo.getScore() ? PlayerTwo.getScore() : 0
    }`;
  };

  const setWinnerDisplay = (winner) => {
    if (winner) {
      winnerDisplay.textContent = PlayerOne.turn
        ? `${PlayerOne.name} WIN!`
        : `${PlayerTwo.name} WIN!`;
    } else {
      winnerDisplay.textContent = "It's a Draw";
    }
  };

  const resetWinnerDisplay = () => {
    winnerDisplay.textContent = "";
  };

  const markBoardCellEvent = (gameBoardCell) => {
    const index = gameBoardCell.dataset.index;

    gameBoardCell.addEventListener("click", (event) => {
      const value = PlayerOne.turn ? "X" : "O";

      if (winnerDisplay.textContent) {
        return;
      }

      const board = getBoard();

      if (!board[index]) {
        setBoardItem(index, value);
        event.target.textContent = value;

        if (checkGameWinner(value)) {
          setWinnerDisplay(true);
          setScore();
          setScoreInDisplay();
          return;
        }

        setPlayerTurn(PlayerOne, PlayerTwo);
        setActivePlayerDisplay(PlayerOne, PlayerTwo);
      }

      if (gameBoard.checkIfDraw()) {
        setWinnerDisplay(false);
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
    playerOneElement.textContent = PlayerOne.name;
    playerTwoElement.textContent = PlayerTwo.name;
  };

  const gameStart = () => {
    menu.classList.add("hidden");
    gameArea.classList.remove("hidden");
  };

  const hideGameArea = () => {
    gameArea.classList.add("hidden");
    menu.classList.remove("hidden");
  };

  const resetBoardDisplay = () => {
    let gameBoardCells = document.querySelectorAll(".gameboard-cell");
    gameBoardCells.forEach((gameBoardCell) => {
      gameBoardCell.textContent = "";
    });
  };

  return {
    renderBoard,
    gameStart,
    getPlayerNamesFromDisplay,
    setPlayerNameInDisplay,
    setPlayerTurn,
    setActivePlayerDisplay,
    setScoreInDisplay,
    resetBoardDisplay,
    resetWinnerDisplay,
    hideGameArea,
    resetPlayerTurn,
  };
})(gameBoard, menu, playerOneText, playerTwoText);

displayController.renderBoard([]);

gameStartButton.addEventListener("click", () => {
  displayController.gameStart();
  displayController.getPlayerNamesFromDisplay();
  displayController.setPlayerNameInDisplay();
  displayController.setPlayerTurn(PlayerOne, PlayerTwo);
  displayController.setScoreInDisplay();
  displayController.setActivePlayerDisplay(PlayerOne, PlayerTwo);
});

playAgainButton.addEventListener("click", () => {
  gameBoard.resetBoard();
  displayController.resetBoardDisplay();
  displayController.resetWinnerDisplay();
  displayController.resetPlayerTurn(PlayerOne, PlayerTwo);
});

gameRestartButton.addEventListener("click", () => {
  PlayerOne.resetScore();
  PlayerTwo.resetScore();
  gameBoard.resetBoard();
  displayController.resetBoardDisplay();
  displayController.resetWinnerDisplay();
  displayController.hideGameArea();
  displayController.resetPlayerTurn(PlayerOne, PlayerTwo);
});
