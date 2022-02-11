//drawing vars

let canvas;
let ctx;

//runs when page is loaded
window.onload = function () {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  //draw on canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1280, 720);
};
