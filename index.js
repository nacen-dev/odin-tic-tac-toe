const BOARD_SIZE = 9;
let currentPlayer = 1;

const winnerDisplay = document.querySelector(".winner-display");
const gameBoardElement = document.querySelector(".gameboard");

const Player = (name) => {
  return {
    name,
  };
};

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
    if (
      (board[0] === input || board[2] === input) &&
      board[4] === input &&
      (board[8] === input || board[6] === input)
    ) {
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

const displayController = ((gameBoard) => {
  const { getBoard, setBoardItem, checkGameWinner } = gameBoard;
  
  const board = getBoard();

  const renderBoard = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      gameBoardElement.appendChild(createGameBoardCell(i));
    }
  };

  const markBoardCellEvent = (gameBoardCell) => {
    const index = gameBoardCell.dataset.index;

    gameBoardCell.addEventListener("click", (event) => {
      const value = currentPlayer === 1 ? "X" : "O";

      if (winnerDisplay.textContent) {
        return;
      }

      if (!board[index]) {
        setBoardItem(index, value);
        event.target.textContent = value;
        if (checkGameWinner(value)) {
          winnerDisplay.textContent = "WIN";
          console.log(gameBoardElement);
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
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

  return {
    renderBoard,
  };
})(gameBoard);

displayController.renderBoard([]);
