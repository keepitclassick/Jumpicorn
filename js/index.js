//drawing vars

let canvas;
let ctx;

//game vars
let gameLoop;
let player;

//runs when page is loaded
window.onload = function () {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  //create player
  player = new Player(100, 400);
  //draw on canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1280, 720);
};
