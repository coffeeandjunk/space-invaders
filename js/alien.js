class Alien {

  constructor(alienImg) {
    this.alienImg = alienImg;
    this.pos = {
      x: random(width),
      y: 0
    };
    this.w = random(30, 60);;
    this.h = this.w;
    this.vel = {
      x: random(-2, 2),
      y: random(3)
    };
  }

  spawn() {
    image(this.alienImg, this.pos.x, this.pos.y, this.w, this.h);
    this.move();
  }

  move() {
    this.pos.y += this.vel.y;
    this.pos.x += this.vel.x;
    this.vel.x += random(-0.5, 0.5);
    this.contain();
  }

  contain() {
    if (this.pos.x <= this.w) {
      this.pos.x = this.w;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x >= width - this.w) {
      this.pos.x = width - this.w;
      this.vel.x = -this.vel.x;
    }
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
