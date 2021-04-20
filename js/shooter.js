class Shooter {

	constructor(shooterImg, x, y, w, h) {
		this.shooterImg = shooterImg;
		this.pos = {
			x: x,
			y: y
		}
		this.w = w;
		this.h = h;
		this.vel = {
			x: 0,
			y: 0
		};
		this.remove = false;
	}

	show() {
		this.pos.x = constrain(this.pos.x, 0, width - this.w);
		this.pos.y = constrain(this.pos.y, height - 200, height - this.w);
		image(this.shooterImg, this.pos.x, this.pos.y, this.w, this.h);
		this.move();
	}

	move() {
		if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
			this.vel.x = -8;
		}
		if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
			this.vel.x = 8, 0;
		}
		if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
			this.vel.y = -8;
		}
		if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
			this.vel.y = 8;
		}
		// update position
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		// apply brakes
		this.vel.x *= 0.9;
		this.vel.y *= 0.9;
	}

	explode(explosionImg) {
		image(explosionImg, this.x - this.w / 2, this.y - this.h / 2, this.w * 2, this.h * 2);
	}

}