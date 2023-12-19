// Function to toggle the navigation menu in mobile view
function toggleNavigation() {
  let nav = document.getElementById("mobile-nav");
  if (nav.classList.contains('w3-show')) {
      nav.classList.remove('w3-show');
  } else {
      nav.classList.add('w3-show');
  }
}

// Configuration for the embedded chatbot
window.embeddedChatbotConfig = {
  chatbotId: "ASfXXySDlPpB5yU4ej6ql",
  domain: "www.chatbase.co"
};

// Replacing icons with feather icons
feather.replace();

// Initialize the game board and player settings
let board = [];
let currentPlayer = 'red';
let computerPlayer = 'yellow';
let isPlayerTurn = true;

// Function to create the game board
function createBoard() {
  for (let row = 0; row < 6; row++) {
    // Create a row array for each row
    const rowArray = [];
    for (let col = 0; col < 7; col++) {
      // Create a slot for each column in the row
      const slot = document.createElement('div');
      slot.classList.add('gameSlot');
      slot.dataset.row = row;
      slot.dataset.col = col;
      slot.addEventListener('click', () => playerMove(col));
      document.getElementById('gameBoard').appendChild(slot);
      rowArray.push('');
    }
    board.push(rowArray);
  }
}

// Function for player's move
function playerMove(col) {
  if (!isPlayerTurn || !isValidMove(col)) return;
  placePiece(col, currentPlayer);
  if (checkWin(currentPlayer)) {
    alert(currentPlayer + ' wins!');
    resetGame();
    return;
  }
  isPlayerTurn = false;
  setTimeout(computerMove, 500); // Delay for the computer's move
}

// Function for computer's move
function computerMove() {
  let col;
  do {
    col = Math.floor(Math.random() * 7);
  } while (!isValidMove(col));
  placePiece(col, computerPlayer);
  if (checkWin(computerPlayer)) {
    alert(computerPlayer + ' wins!');
    resetGame();
    return;
  }
  isPlayerTurn = true;
}

// Function to place a piece on the board
function placePiece(col, player) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === '') {
      board[row][col] = player;
      updateBoard();
      return {row, col};
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  var githubStatsImage = document.querySelector('.github-readme-stats img');
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // User is in dark mode
      githubStatsImage.src = 'https://github-readme-stats.vercel.app/api?username=JWWhalen&show_icons=true&theme=flag-india';
  } else if (window.matchMedia('(-ms-high-contrast)').matches) {
      // High contrast mode
      githubStatsImage.src = 'https://github-readme-stats.vercel.app/api?username=JWWhalen&show_icons=true&theme=flag-india';
  }
});


// Function to check if a player has won
function checkWin(player) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === player) {
        if (checkLine(row, col, 0, 1, player) ||
            checkLine(row, col, 1, 0, player) ||
            checkLine(row, col, 1, 1, player) ||
            checkLine(row, col, 1, -1, player)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to check a line of four pieces
function checkLine(row, col, deltaRow, deltaCol, player) {
  let count = 0;
  let r = row;
  let c = col;

  // Check one direction
  while (c >= 0 && c < 7 && r >= 0 && r < 6 && board[r][c] === player) {
    count++;
    r += deltaRow;
    c += deltaCol;
  }

  // Check the opposite direction
  r = row - deltaRow;
  c = col - deltaCol;
  while (c >= 0 && c < 7 && r >= 0 && r < 6 && board[r][c] === player) {
    count++;
    r -= deltaRow;
    c -= deltaCol;
  }

  return count >= 4;
}

// Function to check if a move is valid
function isValidMove(col) {
  return board[0][col] === '';
}

// Function to update the board visually
function updateBoard() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const slot = document.querySelector(`.gameSlot[data-row="${row}"][data-col="${col}"]`);
      slot.classList.remove('red', 'yellow');
      if (board[row][col] === 'red') {
        slot.classList.add('red');
      } else if (board[row][col] === 'yellow') {
        slot.classList.add('yellow');
      }
    }
  }
}

// Function to reset the game
function resetGame() {
  // Clear the existing game board
  const gameBoard = document.getElementById('gameBoard');
  while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
  }
  board = [];
  createBoard();
  isPlayerTurn = currentPlayer === 'red';
}

// Initialize the game and setup the restart button
document.addEventListener('DOMContentLoaded', function() {
  createBoard();
  document.getElementById('restartButton').addEventListener('click', resetGame);
});
