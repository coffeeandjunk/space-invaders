class Shooter {

  constructor(img, x, y) {
    this.img = img;
    this.pos = {
      x: x,
      y: y
    }
    this.w = 60;
    this.h = 60;
    this.vel = {
      x: 0,
      y: 0
    };
    this.remove = false;
  }

  spawn() {
    this.pos.x = constrain(this.pos.x, this.w/2, width - this.w/2 );
    this.pos.y = constrain(this.pos.y, height - 200, height - this.w/2);
    image(this.img, this.pos.x, this.pos.y, this.w, this.h);
    this.move();
  }

  move() {
    let speed = 20;
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      this.vel.x = -speed;
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      this.vel.x = speed;
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
      this.vel.y = -speed;
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
      this.vel.y = speed;
    }
    // update position
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // apply brakes
    this.vel.x *= 0.9;
    this.vel.y *= 0.9;
  }

  explode(explosionImg, explosionSound) {
    image(explosionImg, this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    if (!explosionSound.isPlaying()) explosionSound.play();
  }
}
