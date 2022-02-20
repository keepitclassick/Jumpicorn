window.onload = function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 800;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let lastTime = 0;
  let enemiesArray = [];
  let gameFrame = 0;
  let score = 0;
  let gameOver = false;
  let keys = [];
  gameOverSound = new Audio();
  gameOverSound.src = "./Assets/Icy Game Over.mp3";

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

  class Enemy {
    constructor() {
      this.y = Math.random() * (canvas.height - 100) - 200;
      this.image = new Image();
      this.image.src = "./Assets/enemy2.png";
      this.speed = Math.random() * 3 - 2;
      this.enemyWidth = 133;
      this.enemyHeight = 94;
      this.width = this.enemyWidth / 2;
      this.x = Math.random() * (canvas.width - this.enemyWidth);
      this.height = this.enemyHeight / 2;
      this.frame = 0;
      this.movementSpeed = Math.floor(Math.random() * 3 + 1);
      this.angle = Math.random() * 2;
      this.angleSpeed = Math.random() * 0.6;
      this.curve = Math.random() * 3;
      this.markedForDeletion = false;
    }
    update() {
      if (!gameOver) {
        this.x += this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += 0.1;

        if (this.x < 0 - this.width) this.markedForDeletion = true;
      }
      //animate enemy frames
      if (gameFrame % this.movementSpeed === 0) {
        this.frame > 4 ? (this.frame = 0) : this.frame++;
      }
      if (this.x + this.width < 0) {
        this.x = canvas.width;
        player.lives--;
      }
      if (player.lives === 0) {
        gameOver = true;
        gameOverSound.play();
      }
    }

    draw() {
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

  let explosions = [];
  class Explosion {
    constructor(x, y, size) {
      this.image = new Image();
      this.image.src = "./Assets/boom.png";
      this.spriteWidth = 200;
      this.spriteHeight = 179;
      this.size = size;
      this.x = x;
      this.y = y;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.frame = 0;
      this.sound = new Audio();
      this.sound.src = "./Assets/boom8.wav";
      this.timeSinceLastFrame = 0;
      this.timer = 0;
      this.markedForDeletion = false;
    }

    update(deltaTime) {
      if (this.frame === 0) this.sound.play();
      this.timeSinceLastFrame += deltaTime;
      if (this.timer % 100 === 0) {
        this.frame++;
      }
      if (this.frame > 5) {
        this.markedForDeletion = true;
      }
    }

    draw() {
      ctx.drawImage(
        this.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const player = {
    x: 200,
    y: 650,
    width: 128,
    height: 128,
    frameX: 0,
    frameY: 0,
    speed: 30,
    moving: false,
    velocity: 0,
    weight: 1,
    lives: 5,
  };

  const playerSprite = new Image();
  playerSprite.src = "./Assets/rainbowuni.png";

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

  function movePlayer(enemies) {
    //collision detection
    enemies.forEach((enemy) => {
      const distanceX =
        enemy.x + enemy.enemyWidth / 2 - (player.x + player.width);
      const distanceY =
        enemy.y + enemy.enemyHeight / 2 - (player.y + player.height / 2);

      const fullDistance = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );
      if (fullDistance < enemy.enemyWidth / 3 + player.width / 3) {
        enemy.markedForDeletion = true;
        explosions.push(new Explosion(enemy.x, enemy.y, enemy.enemyWidth));
        console.log(explosions.length);

        for (i = 1; i < explosions.length; i++) {
          explosions[i].draw();
        }
        score++;
      }
    });

    //assign correct asset to each movement
    if (keys[38] === true && player.y > 310) {
      player.y -= player.speed;
      player.frameY = 0;
      console.log(keys);
      player.moving = true;
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
    }
    if (keys[39] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 1;
      player.moving = true;
    }

    if (keys[39] && keys[32] && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
    }

    if (keys[32] && onGround()) {
      player.x += player.speed;
      player.frameY = 0;
      player.moving = true;
      player.velocity = -30;
    }

    //vertical movement
    player.y += player.velocity;
    if (!onGround()) {
      player.velocity += player.weight;
    } else {
      player.velocity = 0;
    }

    //add vertical boundary
    if (player.y > canvas.height - 300) {
      player.y = canvas.height - 300;
    }
  }

  //check if player is on the ground
  onGround = () => {
    return player.y >= canvas.height - 300;
  };

  animate = function (timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    enemyTimer += deltaTime;
    if (enemyTimer > enemyInterval && enemiesArray.length < 10) {
      enemiesArray.push(new Enemy());
    }
    [...enemiesArray, ...explosions].forEach((obj) => obj.update(deltaTime));
    [...enemiesArray, ...explosions].forEach((obj) => obj.draw(deltaTime));
    enemiesArray = enemiesArray.filter((obj) => !obj.markedForDeletion);
    explosions = explosions.filter((obj) => !obj.markedForDeletion);

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
      player.width * 2,
      player.height * 2
    );
    ctx.strokeStyle = "white";
    movePlayer(enemiesArray);
    handlePlayerFrame();
    displayStatus(ctx);
    if (!gameOver) requestAnimationFrame(animate);
  };
  animate(0);

  function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
  }

  //generate enemies

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
    ctx.font = "40px  Orbitron";
    ctx.fillText("Score: " + score, 20, 50);

    ctx.fillStyle = "white";
    ctx.font = "40px  Orbitron";
    ctx.fillText("Score: " + score, 20, 54);

    ctx.fillStyle = "black";
    ctx.font = "40px  Orbitron";
    ctx.fillText("Lives: " + player.lives, 20, 100);

    ctx.fillStyle = "white";
    ctx.font = "40px  Orbitron";
    ctx.fillText("Lives: " + player.lives, 20, 104);

    if (gameOver) {
      ctx.textAlign = "center";
      ctx.font = "40px  Orbitron";
      ctx.fillStyle = "black";
      ctx.fillText("Game Over!", canvas.width / 2, 200);
      ctx.textAlign = "center";
      ctx.font = "40px  Orbitron";
      ctx.fillStyle = "white";
      ctx.fillText("Game Over!", canvas.width / 2, 204);
    }
  }
};
