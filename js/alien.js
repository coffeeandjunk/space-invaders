class Alien {

  constructor(alienImg) {
    this.alienImg = alienImg;
    this.pos = {
      x: random(width),
      y: random(height / 6)
    };
    this.w = random(60, 80);;
    this.h = this.w;
    this.vel = {
      x: 0,
      y: random(1)
    };
  }

  spawn() {
    this.pos.x = constrain(this.pos.x, this.w / 2, width - this.w / 2);
    image(this.alienImg, this.pos.x, this.pos.y, this.w, this.h);
    this.move();
  }

  move() {
    this.pos.y += this.vel.y;
    this.pos.x += this.vel.x;
    this.vel.x += random(-0.1, 0.1);
  }

  isOffScreen() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      return true;
    } else return false;
  }

  explode(explosionImg, explosionSound) {
    image(explosionImg, this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    explosionSound.play();
  }
}
