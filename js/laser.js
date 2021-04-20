class Laser {

  constructor(img, x, y, alien) {
    this.type = alien || "shooter";
    this.img = img;
    this.pos = {
      x: x,
      y: y
    };
    if (this.type == "alien") {
      this.w = 20;
      this.h = 20;
      this.vel = {
        x: 0,
        y: random(4, 8)
      }
    } else {
      this.w = 60;
      this.h = 60;
      this.vel = {
        x: 0,
        y: -8
      };
    }
  }

  fire() {
    image(this.img, this.pos.x - 20, this.pos.y, this.w, this.h);
    image(this.img, this.pos.x + 20, this.pos.y, this.w, this.h);
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

  hits(entity) {
    let d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < entity.w) {
      return true;
    } else {
      return false;
    }
  }
}
