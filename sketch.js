let game = true,
	shooter,
	shooterSprite,
	beams0 = [],
	beams1 = [],
	beamsprite,
	beamsound,
	shooterhitsound,
	aliensprite = []

function preload() {
	shooterSprite = loadImage('assets/sprites/shooter/redfighter.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	let shooterImg = shooterSprite;
	let x = width / 2;
	let y = height - 80;
	let w = 60;
	let h = 60;

	shooter = new Shooter(shooterImg, x, y, w, h);
}

function draw() {
	background(0);

	shooter.show();
}