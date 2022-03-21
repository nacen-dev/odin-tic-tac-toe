const BOARD_SIZE = 9;
let currentPlayer = 1;

const gameBoard = (() => {
  const board = new Array(BOARD_SIZE);

  const getBoard = () => board;

  const setBoardItem = (index, input) => {
    board[index] = input;
  };

  return {
    getBoard,
    setBoardItem,
  };
})();

const displayController = ((gameBoard) => {
  const { getBoard, setBoardItem } = gameBoard;
  const board = getBoard();

  const renderBoard = () => {
    const gameBoardElement = document.querySelector(".gameboard");
    for (let i = 0; i < BOARD_SIZE; i++) {
      gameBoardElement.appendChild(createGameBoardCell(i));
    }
  };

  const markBoardCellEvent = (gameBoardCell) => {
    const index = gameBoardCell.dataset.index;

    gameBoardCell.addEventListener("click", (event) => {
      const value = currentPlayer === 1 ? "X" : "O";

      if (!board[index]) {
        setBoardItem(index, value);
        event.target.textContent = value;
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

const Player = (name) => {
  let score = 0;
  const incrementScore = () => {
    score += 1;
  };

  const getScore = () => score;

  return {
    name,
    getScore,
    incrementScore,
  };
};

let player1 = Player("Player 1");
let player2 = Player("Player 2");

displayController.renderBoard([]);
