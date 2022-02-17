window.onload = function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 800;

  //var to keep track of keys pressed
  keys = [];

  const player = {
    x: 200,
    y: 650,
    width: 64,
    height: 170,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    velocity: 0,
    weight: 1,
  };
  console.log(player.y);

  const playerSprite = new Image();
  playerSprite.src = "./Assets/idle.png";

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
      playerSprite.src = "./Assets/walk (1).png";
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

    if (keys[32] && onGround()) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
      player.velocity = -30;
      playerSprite.src = "./Assets/spinjump.png";
    }

    //vertical movement
    player.y += player.velocity;
    if (!onGround()) {
      player.velocity += player.weight;
    } else {
      player.velocity = 0;
    }

    //add vertical boundary
    if (player.y > canvas.height - player.height) {
      player.y = canvas.height - player.height;
    }
  }

  onGround = () => {
    return player.y >= canvas.height - player.height;
  };

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("background");
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      this.speed = 5;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }
  }
  const backgroundImage = new Background(canvas.width, canvas.height);
  let score = 0;

  animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw(ctx);
    backgroundImage.update();
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
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      player.x,
      player.y + player.height / 4,
      player.width,
      player.height / 2
    );
    ctx.beginPath();
    ctx.arc(
      player.x + player.width / 2,
      player.y + player.height / 2,
      player.width / 2,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    movePlayer();
    handlePlayerFrame();
    displayStatus(ctx);
    requestAnimationFrame(animate);
  };
  animate();
  function handlePlayerFrame() {
    if (player.frameX < 7 && player.moving) player.frameX++;
    else player.frameX = 0;
  }

  //generate enemies
  const numberOfEnemies = Math.random() * 20 - 2;
  const enemiesArray = [];
  let gameFrame = 0;

  class Enemy {
    constructor() {
      this.y = 500;
      this.image = new Image();
      this.image.src = "./Assets/enemy2.png";
      this.speed = Math.random() * 4 - 2;
      this.enemyWidth = 133;
      this.enemyHeight = 94;
      this.width = this.enemyWidth / 2;
      this.x = Math.random() * (canvas.width - this.enemyWidth);
      this.height = this.enemyHeight / 2;
      this.frame = 0;
      this.movementSpeed = Math.floor(Math.random() * 3 + 1);
      this.angle = Math.random() * 2;
      this.angleSpeed = Math.random() * 0.2;
      this.curve = Math.random() * 7;
    }
    update() {
      this.x -= this.speed;
      this.y += this.curve * Math.sin(this.angle);
      this.angle += 0.1;
      if (this.x + this.width < 0) {
        this.x = canvas.width;
        score++;
      }

      //animate enemy frames
      if (gameFrame % this.movementSpeed === 0) {
        this.frame > 4 ? (this.frame = 0) : this.frame++;
      }
    }

    draw() {
      ctx.strokeRect(this.x, this.y, this.enemyWidth / 2, this.enemyHeight / 2);
      ctx.drawImage(
        this.image,
        this.frame * this.enemyWidth,
        0,
        this.enemyWidth,
        this.enemyHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
  }

  function animateEnemy() {
    requestAnimationFrame(animateEnemy);
    enemiesArray.forEach((enemy) => {
      enemy.update();
      enemy.draw();
    });
  }
  animateEnemy();

  function displayStatus() {
    ctx.fillStyle = "black";
    ctx.font = "40px helvetica";
    ctx.fillText("Score: " + score, 20, 50);

    ctx.fillStyle = "white";
    ctx.font = "40px helvetica";
    ctx.fillText("Score: " + score, 20, 52);
  }
};
