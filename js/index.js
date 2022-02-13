//runs when page is loaded

//setup key listeners
//setupInputs();

//Start game gameLoop

/*function step() {
  player.step();
  //draw everything
  draw();
}*/

/*
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
}*/

/*this.step = function () {
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
  };*/
