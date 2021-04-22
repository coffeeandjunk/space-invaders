let r,
  cnv,
  bkgdImg,
  shooter,
  shooterImg,
  laserImg,
  alienLaserImg,
  explosionImg,
  explosionSound,
  shooterExplosionSound,
  alienLaserSound,
  laserSound,
  aliensImg = [],
  starsImg = [],
  planetsImg = [],
  planets = [],
  asteroidsImg = [],
  asteroids = [],
  stars = [],
  lasersLeft = [],
  lasersRight = [],
  lasersCentre = [],
  alienLasers = [],
  aliens = []

function preload() {
  bkgdImg = loadImage('assets/sprites/background.png');
  shooterImg = loadImage('assets/sprites/shooter/redfighter.png');
  laserImg = loadImage('assets/sprites/shooter/laser.png');
  explosionImg = loadImage('assets/sprites/explosion.png');
  alienLaserImg = loadImage('assets/sprites/aliens/alien-beam.png');
  for (let i = 0; i < 7; i++) {
    aliensImg[i] = loadImage('assets/sprites/aliens/alien' + i + '.png');
  }
  for (let i = 0; i < 3; i++) {
    starsImg[i] = loadImage('assets/sprites/stars/star' + i + '.png');
  }
  for (let i = 0; i < 9; i++) {
    planetsImg[i] = loadImage('assets/sprites/planets/planet' + i + '.png');
  }
  for (let i = 0; i < 5; i++) {
    asteroidsImg[i] = loadImage('assets/sprites/asteroids/asteroid' + i + '.png');
  }

  laserSound = loadSound('assets/sounds/laser.mp3');
  explosionSound = loadSound('assets/sounds/explosion.wav');
  shooterExplosionSound = loadSound('assets/sounds/shooter-explosion.mp3');
  alienLaserSound = loadSound('assets/sounds/alien-laser.wav');

}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  // spawn shooter
  let x = width / 2;
  let y = height - 200;
  shooter = new Shooter(shooterImg, x, y);
}

function draw() {
  background(0);
  imageMode(CORNERS);
  image(bkgdImg, 0, 0, width, height);
  imageMode(CENTER);
  showExtras();

  //spawn aliens
  r = random(100);
  if (r < 1) {
    for (let i = 0; i < random(10, 15); i++) {
      let alienImg = random(aliensImg);
      alien = new Alien(alienImg);
      aliens.push(alien);
    }
  }

  //remove offscreen aliens
  for (let i in aliens) {
    aliens[i].spawn();
    alienFire(aliens);
    if (aliens[i].isOffScreen()) {
      aliens.splice(i, 1);
      i--;
    }
  }

  //show lasers fired
  for (let i in lasersLeft) {
    lasersLeft[i].fire();
    lasersRight[i].fire();
    lasersCentre[i].fire();
    if (lasersLeft[i].isOffScreen() || lasersRight[i].isOffScreen() || lasersCentre[i].isOffScreen()) {
      lasersLeft.splice(i, 1);
      lasersRight.splice(i, 1);
      lasersCentre.splice(i, 1);
      i--;
    } else {
      killAliens(i);
    }
  }

  //show alien lasers fired
  for (let i in alienLasers) {
    alienLasers[i].fire();
    if (alienLasers[i].isOffScreen()) {
      alienLasers.splice(i, 1);
      i--;
    } else {
      damageShooter(i);
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
  let laser = new Laser(laserImg, shooter.pos.x - 20, shooter.pos.y, "shooter", -4);
  lasersLeft.push(laser);
  laser = new Laser(laserImg, shooter.pos.x + 30, shooter.pos.y,"shooter", 4);
  lasersRight.push(laser);
  laser = new Laser(laserImg, shooter.pos.x, shooter.pos.y, "shooter", 0, 120);
  lasersCentre.push(laser);
  laserSound.play();
}

function killAliens(laser) {
  for (let j = aliens.length - 1; j >= 0; j--) {
    if (lasersLeft[laser].hits(aliens[j]) || lasersRight[laser].hits(aliens[j]) || lasersCentre[laser].hits(aliens[j])) {
      aliens[j].explode(explosionImg, explosionSound);
      removeLaserAndAlien(j, laser);
      break;
    } else {
      for (let i = alienLasers.length - 1; i >= 0; i--) {
        if (lasersLeft[laser].hits(alienLasers[i]) || lasersRight[laser].hits(alienLasers[i]) || lasersCentre[laser].hits(alienLasers[i])) {
          // lasers.splice(laser, 1);
          alienLasers.splice(i, 1);
          break;
        }
      }
    }
  }
}

function removeLaserAndAlien(alien, laser) {
  aliens.splice(alien, 1);
  // lasers.splice(laser, 1);
}

function alienFire() {
  let r = random(100);
  if (r < 1) {
    let alien = random(aliens);
    let laser = new Laser(alienLaserImg, alien.pos.x, alien.pos.y, "alien");
    alienLasers.push(laser);
    laserSound.play();
  }
}

function damageShooter(laser) {
  if (alienLasers[laser].hits(shooter)) {
    shooter.explode(explosionImg, shooterExplosionSound);
    // removeLaserAndAlien(j, laser);
  }
}

function showExtras() {
  r = random(100);
  if (r < 1) {
    //stars
    for (let i = 0; i < 100; i++) {
      let starImg = random(starsImg);
      let star = new Element(starImg, random(1), random(1));
      stars.push(star);
    }

    //asteroids
    for (let i = 0; i < 3; i++) {
      let asteroidImg = random(asteroidsImg);
      let asteroid = new Element(asteroidImg, random(50), random(1));
      asteroids.push(asteroid);
    }

    //planets
    for (let i = 0; i < 3; i++) {
      let planetImg = random(planetsImg);
      let planet = new Element(planetImg, random(15), random(1));
      planets.push(planet);
    }
  }


  for (let i in stars) {
    stars[i].show();
    if (stars[i].isOffScreen()) {
      stars.splice(i, 1);
      // i--;
    }
  }

  for (let i in planets) {
    planets[i].show();
    if (planets[i].isOffScreen()) {
      planets.splice(i, 1);
      // i--;
    }
  }

  for (let i in asteroids) {
    asteroids[i].show();
    if (asteroids[i].isOffScreen()) {
      asteroids.splice(i, 1);
      i--;
    }
  }
}
