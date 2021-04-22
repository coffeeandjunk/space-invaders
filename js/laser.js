class Laser {

  constructor(img, x, y, type, sx, size) {
    this.type = type || "shooter";
    this.img = img;
    this.pos = {
      x: x,
      y: y
    };
    if (this.type == "alien") {
      this.w = random(20, 40);
      this.h = random(20, 40);
      this.vel = {
        x: 0,
        y: random(10, 15)
      }
    } else {
      this.w = size || 60;
      this.h = size || 60;
      this.vel = {
        x: sx || 0,
        y: random(-15, -20)
      };
    }
  }
  fire() {
    if (this.type == "alien") {
      image(this.img, this.pos.x - 20, this.pos.y, this.w, this.h);
      image(this.img, this.pos.x + 20, this.pos.y, this.w, this.h);
    }
    else image(this.img, this.pos.x, this.pos.y, this.w, this.h);
    this.move();
  }

  move() {
    this.pos.y += this.vel.y;
    this.pos.x += this.vel.x;
    if (this.type == "alien") this.vel.x += random(-1, 1);
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
