class Alien {

  constructor(alienImg, x, y) {
    this.alienImg = alienImg;
    this.pos = {
      x: x,
      y: y
    };
    this.w = random(20, 40);;
    this.h = this.w;
    this.vel = {
      x: 0,
      y: random(0.5)
    };
  }

  spawn() {
    this.pos.x = constrain(this.pos.x, this.w/2, width - this.w/2 );
    image(this.alienImg, this.pos.x, this.pos.y, this.w, this.h);
    this.move();
  }

  move() {
    this.pos.y += this.vel.y;
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

  hits(shooter) {

    let hits = dist(this.x, this.y, players.x, players.y);

    if (hits < players.w) {
      return true;
    } else {
      return false;
    }
  }

  createone() {
    this.alienImg = random(alienImg);
    this.x = random(width);
    this.y = random(-100);
    this.w = (random(30) + 5);
    this.h = this.w;
    this.ys = random(1);
  }
}
