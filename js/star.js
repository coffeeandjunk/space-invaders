class Star {
  constructor(img) {
    this.img = img;
    this.pos = {
      x: random(width),
      y: random(height)
    };
    this.w = random(1);
    this.h = this.w;
    this.vel = {
      x: 0,
      y: random(1)
    };
  }

  show() {
    image(this.img, this.pos.x, this.pos.y, this.w, this.h);
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
}
