const MAIN_BLOCK = document.getElementById("main");

/*Images params*/
const IMAGES_PATH = "./img/";
const IMAGES = [
	"cola",
	"rocket",
	"scient",
	"thumb",
	"weapon",
	"worker"
];
const IMAGES_SIDE = 124;
const IMAGES_EXTENSION = ".png";
const IMAGES_WIN_PREFIX = "-green";

/*Cols params*/
const COLS_COUNT = 5;
const COLS_HEIGHT = IMAGES_SIDE * 3;

/*User params*/
const DEFAULT_USER_AMOUNT = 20;
const DEFAULT_BET_VALUE = 5;

/*Draw each Pictures*/
let Picture = function(name, x, y, context) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = IMAGES_SIDE;
	this.height = IMAGES_SIDE;
	this.isWin = false;

	this.img = new Image();
	this.img.src;
	this.ctx = context;
}

Picture.prototype.draw = function(context) {
	if(this.isWin) {
		this.img.src = IMAGES_PATH + this.name + IMAGES_WIN_PREFIX + IMAGES_EXTENSION;
	} else {
		this.img.src = IMAGES_PATH + this.name + IMAGES_EXTENSION;
	}
	context.drawImage(this.img, this.x, this.y);
}

Picture.prototype.clear = function(context) {
	context.clearRect(this.x, this.y, IMAGES_SIDE, IMAGES_SIDE);
}

/*Create Columns from Pictures*/
let Column = function() {
	this.pictures;
	this.x = 0;
	this.basicY;
	this.animation;
	this.animationStep = 8;

	this.canvas;
	this.ctx;
}

Column.prototype.createCanvas = function() {
	let canvas = document.createElement("canvas");
	canvas.setAttribute("width", IMAGES_SIDE);
	canvas.setAttribute("height", COLS_HEIGHT);
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	MAIN_BLOCK.appendChild(canvas);
}

Column.prototype.clearCanvas = function() {
	MAIN_BLOCK.removeChild(this.canvas);
}

Column.prototype.create = function() {
	let images = IMAGES.sort(function() {
		return 0.5 - Math.random();
	});

	this.basicY = COLS_HEIGHT - IMAGES_SIDE * images.length;

	this.pictures = images.map((name, i) => {
		let pic = new Picture(
			name,
			this.x,
			this.basicY + (IMAGES_SIDE * i),
			this.ctx
		);
		return pic;
	});
}

Column.prototype.draw = function() {
	this.pictures.forEach((picObject) => {
		picObject.draw(this.ctx);
	});
}

Column.prototype.animation = function(speed) {
	this.animation = true;

	let intSpeed = (speed) ? speed : 1;

	let intervalId = setInterval(() => {
		this.ctx.clearRect(this.x, 0, this.x + IMAGES_SIDE, COLS_HEIGHT);

		this.pictures.forEach((picObject) => {
			picObject.y += this.animationStep;
			picObject.draw(this.ctx);
		});

		if (this.animation
			&& this.pictures[this.pictures.length - 1].y >= COLS_HEIGHT)
		{			
			this.pictures.unshift(this.pictures.pop());
			this.pictures[0].y = this.basicY + (this.pictures[0].y - COLS_HEIGHT);
		} else if (!this.animation
			&& this.pictures[this.pictures.length - 1].y >= COLS_HEIGHT)
		{
			clearInterval(intervalId);
		}
	}, 1);
}

Column.prototype.slow = function() {
	this.animationStep = 1;
}

Column.prototype.stop = function() {
	this.animation = false;
}
