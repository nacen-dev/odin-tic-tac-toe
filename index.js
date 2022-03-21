const gameBoard = (() => {
  const board = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

  return {
    board,
  };
})();

const displayController = (() => {
  const renderBoard = (board) => {
    const gameBoardElement = document.querySelector(".gameboard");
    for (let i = 0; i < board.length; i++) {
      const gameBoardCell = document.createElement("div");
      gameBoardCell.className = "gameboard-cell"
      gameBoardCell.textContent = board[i].toUpperCase();
      gameBoardElement.appendChild(gameBoardCell);
    }
  };
  return {
    renderBoard,
  };
})();

const Player = (name) => {
  let score = 0;
  const incrementScore = () => {
    score += 1;
  } 

  const getScore = () => score;

  return {
    name,
    getScore,
    incrementScore
  }
};

displayController.renderBoard(gameBoard.board);
