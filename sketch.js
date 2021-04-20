let game = true,
  shooter,
  shooterImg,
  laserImg,
  alienLaserImg,
  explosionImg,
  explosionSound,
  alienLaserSound,
  laserSound,
  aliensImg = [],
  lasers = [],
  alienLasers = [],
  aliens = []

function preload() {
  shooterImg = loadImage('assets/sprites/shooter/redfighter.png');
  laserImg = loadImage('assets/sprites/shooter/laser.png');
  explosionImg = loadImage('assets/sprites/explosion.png');
  alienLaserImg = loadImage('assets/sprites/aliens/alien-beam.png');
  for (let i = 0; i < 7; i++) {
    aliensImg[i] = loadImage('assets/sprites/aliens/alien' + i + '.png');
  }

  laserSound = loadSound('assets/sounds/laser.mp3');
  explosionSound = loadSound('assets/sounds/explosion.wav');
  alienLaserSound = loadSound('assets/sounds/alien-laser.wav');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  // spawn shooter
  let x = width / 2;
  let y = height - 40;
  shooter = new Shooter(shooterImg, x, y);
}

function draw() {
  background(0);

  //spawn aliens
  let r = random(100);
  if (r < 1) {
    for (let i = 0; i < random(5); i++) {
      let alienImg = random(aliensImg);
      let x = random(width);
      let y = 0;
      alien = new Alien(alienImg, x, y);
      aliens.push(alien);
    }
  }

  for (let i in aliens) {
    aliens[i].spawn();
    if (aliens[i].isOffScreen()) {
      aliens.splice(i, 1);
      i--;
    }
  }

  for (let i in lasers) {
    lasers[i].fire();
    if (lasers[i].isOffScreen()) {
      lasers.splice(i, 1);
      i--;
    } else {
      killAliens(i);
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

function killAliens(laser) {
  for (let j = aliens.length - 1; j >= 0; j--) {
    if (lasers[laser].hits(aliens[j])) {
      aliens[j].explode(explosionImg, explosionSound);
      removeLaserAndAlien(j, laser);
      break;
    }
  }
}

function removeLaserAndAlien(alien, laser) {
  aliens.splice(alien, 1);
  lasers.splice(laser, 1);
}
