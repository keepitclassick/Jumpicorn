function Player(x, y) {
  this.x = x;
  this.y = y;
  this.xspeed = 0;
  this.yspeed = 0;
  this.friction = 0.6;
  this.maxspeed = 10;
  playerWidth = 100;
  playerHeight = 80;
  this.active = true;
  frameX = 0;
  frameY = 0;
  moving = false;

  const playerSprite = new Image();
  playerSprite.src = "./Assets/rsz_spritesheet.png";
  const background = new Image();
  background.src = "./Assets/4T_Eqv.png";

  function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      0,
      0,
      playerWidth,
      playerHeight,
      0,
      0,
      playerWidth,
      playerHeight
    );

    requestAnimationFrame(animate);
  }
  animate();

  this.step = function () {
    //movement
    if (this.active) {
      //horizontal movement
      if ((!leftKey && !rightKey) || (leftKey && rightKey)) {
        //slow down
        this.xspeed *= this.friction;
      } else if (rightKey) {
        //move right
        this.xspeed++;
      } else if (leftKey) {
        //move left
        this.xspeed--;
      }
      //vertical movement
      if (upKey) {
        this.yspeed -= 15;
      }
      //gravity
      this.yspeed += 5;
      //correct speed
      if (this.xspeed > this.maxspeed) {
        this.xspeed = this.maxspeed;
      } else if (this.xspeed < -this.maxspeed) {
        this.xspeed = -this.maxspeed;
      }

      if (this.yspeed > this.maxspeed) {
        this.yspeed = this.maxspeed;
      } else if (this.yspeed < -this.maxspeed) {
        this.yspeed = -this.maxspeed;
      }

      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  };
}
