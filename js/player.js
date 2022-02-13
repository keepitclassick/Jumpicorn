window.onload = function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  //var to keep track of keys pressed
  keys = [];

  const player = {
    x: 200,
    y: 600,
    width: 100,
    height: 80,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
  };

  const playerSprite = new Image();
  playerSprite.src = "./Assets/rsz_spritesheet.png";

  const background = new Image();
  background.src = "./Assets/4T_Eqv.png";

  let drawSprite = function (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  };

  animate = function () {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    requestAnimationFrame(animate);
  };
  animate();

  window.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
    console.log(keys);
  });
  window.addEventListener("keyup", (e) => {
    delete keys[e.keyCode];
  });

  function movePlayer() {
    if (keys[38] === true) {
      player.y -= player.speed;
      player.frameY = 6;
      player.frameX = 1;
    }

    if (keys[37] === true && player.x > 0) {
      player.x -= player.speed;
      player.frameY = 5;
    }

    if (keys[40] === true) {
      player.y += player.speed;

      player.frameY = 4;
    }

    if (keys[39]) {
      player.x += player.speed;

      player.frameY = 2;
    }
  }
};
