let game = true,
  shooter,
  shooterImg,
  laserImg,
  laserSound,
  lasers = [];
laserImg,
laserSound,
aliensprite = []

function preload() {
  shooterImg = loadImage('assets/sprites/shooter/redfighter.png');
  laserImg = loadImage('assets/sprites/shooter/laser.png');
  laserSound = loadSound('assets/sounds/laser.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = width / 2;
  let y = height - 40;
  shooter = new Shooter(shooterImg, x, y);
}

function draw() {
  background(0);

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].fire();
    lasers[i].move();
    if (lasers[i].isOffScreen()) {
      lasers.splice(i, 1);
    } else {
      // killAliens()
    }
  }
  shooter.spawn();
}

function keyPressed() {
  if (keyCode == 32) {
    shootLasers();
  }
}

function shootLasers() {
  let laser = new Laser(laserImg, shooter.pos.x, shooter.pos.y)
  lasers.push(laser);
  laserSound.play();
}

function killAliens() {
  for (let j = aliens.length - 1; j >= 0; j--) {
    if (lasers[i].hits(aliens[j])) {
      aliens.splice(j, 1);
      lasers.splice(i, 1);
      break;
    }
  }
}
