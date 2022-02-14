window.onload = function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 800;

  //var to keep track of keys pressed
  keys = [];

  const player = {
    x: 200,
    y: 600,
    width: 64,
    height: 128,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
  };

  const playerSprite = new Image();

  const background = new Image();
  background.src = "./Assets/4T_Eqv.png";

  let drawSprite = function (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  };

  window.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
    player.moving = true;
  });
  window.addEventListener("keyup", (e) => {
    delete keys[e.keyCode];
    player.moving = false;
  });

  function movePlayer() {
    if (keys[38] === true && player.y > 310) {
      player.y -= player.speed;
      player.frameY = 0;
      console.log(keys);
      player.moving = true;
      playerSprite.src = "./Assets/jump.png";
    }

    if (keys[37] === true && player.x > 0) {
      player.x -= player.speed;
      player.moving = true;
      player.frameY = 0;
    }

    if (keys[40] === true && player.y < canvas.height - player.height) {
      player.y += player.speed;
      player.frameY = 0;
      player.moving = true;
      playerSprite.src = "./Assets/fall.png";
    }
    if (keys[39] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
      playerSprite.src = "./Assets/walk (1).png";
    }

    if (keys[39] && keys[32] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
      playerSprite.src = "./Assets/run.png";
    }

    if (keys[32]) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
      playerSprite.src = "./Assets/spinjump.png";
    }
  }

  function handlePlayerFrame() {
    if (player.frameX < 7 && player.moving) player.frameX++;
    else player.frameX = 0;
  }

  animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    handlePlayerFrame();
    requestAnimationFrame(animate);
  };
  animate();
};
