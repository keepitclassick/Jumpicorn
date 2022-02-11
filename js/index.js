//drawing vars

let canvas;
let ctx;

//input vars
let upKey;
let downKey;
let leftKey;
let rightKey;

//game vars
let gameLoop;
let player;

//runs when page is loaded
window.onload = function () {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  //setup key listeners
  setupInputs();
  //create player
  player = new Player(100, 400);

  //Start game gameLoop
  gameLoop = setInterval(step, 1000 / 30);
  //draw on canvas
};

function step() {
  player.step();
  //draw everything
  draw();
}

function draw() {
  //clear the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1280, 720);

  //draw player
  player.draw();
}

function setupInputs() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "w" || e.key === "ArrowUp") {
      upKey = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftKey = true;
    } else if (e.key === "s" || e.key === "ArrowDown") {
      downKey = true;
    } else if (e.key === "d" || e.key === "ArrowRight") {
      rightKey = true;
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "w" || e.key === "ArrowUp") {
      upKey = false;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftKey = false;
    } else if (e.key === "s" || e.key === "ArrowDown") {
      downKey = false;
    } else if (e.key === "d" || e.key === "ArrowRight") {
      rightKey = false;
    }
  });
}
