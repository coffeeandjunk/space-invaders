class Laser {

	constructor(img, x, y){
		this.img = img;
		this.pos = {
      x: x,
      y: y
    };
		this.w = 60;
		this.h = 60;
    this.vel = {
      x: 0,
      y: -8
    };
	}

  fire() {
    image(this.img, this.pos.x - 20, this.pos.y, this.w, this.h);
    image(this.img, this.pos.x + 20, this.pos.y, this.w, this.h);
    this.move();
  }

	move(){
    this.pos.y += this.vel.y;
	}

  isOffScreen() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      return true;
    } else return false;
  }

	hits(alien){
		let d = dist(this.pos.x, this.pos.y, alien.pos.x, alien.pos.y);
		if(d < alien.w){
			return true;
		} else{
			return false;
		}
	}
}
