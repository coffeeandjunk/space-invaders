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
    imageMode(CENTER);
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

	hits(enemies){
		let beamhitsenemies = dist(this.x, this.y, enemies.x, enemies.y);
		if(beamhitsenemies < enemies.w){
			return true;
		}else{
			return false;
		}
	}

	remove(){
		this.delete = true;
	}
}
