const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");

const boxSize = 20; // Size of each square box
const canvasSize = canvas.width / boxSize;

// Snake and Fruit
let snake = [{ x: 10, y: 10 }];
let fruit = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
let direction = "RIGHT";
let score = 0;

// Game Flags
let isRunning = false;
let gameInterval;

// Draw the grid, snake, and fruit
function drawGame() {
  ctx.fillStyle = "#27293d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Fruit
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(fruit.x * boxSize, fruit.y * boxSize, boxSize, boxSize);

  // Draw Snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#6f42c1" : "#ffffff"; // Head and body
    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
  });
}

// Update game logic
function updateGame() {
  const head = { ...snake[0] };

  // Move the snake's head
  if (direction === "LEFT") head.x -= 1;
  if (direction === "RIGHT") head.x += 1;
  if (direction === "UP") head.y -= 1;
  if (direction === "DOWN") head.y += 1;

  // Check for collisions (walls or itself)
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || isColliding(head)) {
    clearInterval(gameInterval);
    isRunning = false;
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }

  // Check if fruit is eaten
  if (head.x === fruit.x && head.y === fruit.y) {
    score += 10;
    fruit = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
  } else {
    snake.pop(); // Remove tail
  }

  // Add new head to the snake
  snake.unshift(head);

  // Update UI
  scoreDisplay.textContent = score;

  drawGame();
}

// Check if the snake collides with itself
function isColliding(head) {
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Change direction
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "RIGHT";
  score = 0;
}

// Start the game
startBtn.addEventListener("click", () => {
  if (isRunning) return;
  isRunning = true;
  gameInterval = setInterval(updateGame, 150);
});
