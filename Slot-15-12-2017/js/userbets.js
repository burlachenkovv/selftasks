let UserAssets = function() {
	this.userAmount = DEFAULT_USER_AMOUNT;
	this.currentBet = DEFAULT_BET_VALUE;
	this.lastBet;
}

let BetCanvas = function() {
	this.canvas;
	this.ctx;
	this.canvasWidth;
	this.canvasHeight;

	//plus and minus buttons
	this.plusCenterX;
	this.minusCenterX;
	this.buttonCenterY = 14;
	this.buttonRadius = 7;
	this.textBaseLine = 20;
}

BetCanvas.prototype.createBetCanvas = function() {
	let block = document.getElementById("bet__block");

	this.canvas = document.createElement("canvas");	
	this.canvasWidth = block.offsetWidth / 2 - 1;
	this.canvasHeight = block.offsetHeight;
	this.canvas.setAttribute("width", this.canvasWidth);
	this.canvas.setAttribute("height", this.canvasHeight);
	this.canvas.style.border = "none";

	this.ctx = this.canvas.getContext("2d");
	block.appendChild(this.canvas);

	this.plusCenterX = this.canvasWidth - 35;
	this.minusCenterX = this.canvasWidth - 15;
}


BetCanvas.prototype.drawScore = function(type, value) {
	let textString = type + ": " + value;

	this.ctx.font = "18px Arial";
	this.ctx.fillStyle = "#8fbf8d";
	this.ctx.textAlign = "center";
	this.ctx.clearRect(0, 0, this.plusCenterX - this.buttonRadius, this.canvasHeight);
	this.ctx.fillText(textString, this.canvasWidth / 2 - 10, this.textBaseLine);
}

BetCanvas.prototype.drawButtons = function() {
	this.ctx.beginPath();
	this.ctx.fillStyle = "#8fbf8d";
	this.ctx.arc(this.plusCenterX, this.buttonCenterY, this.buttonRadius, 0, Math.PI * 2);
	this.ctx.arc(this.minusCenterX, this.buttonCenterY, this.buttonRadius, 0, Math.PI * 2);
	this.ctx.fill();

	this.ctx.fillStyle = "#000";
	this.ctx.fillText("+", this.plusCenterX, this.textBaseLine);
	this.ctx.fillText("-", this.minusCenterX, this.textBaseLine - 1);
}

BetCanvas.prototype.activateButtons = function(BetObject) {
	this.canvas.addEventListener("click", (event) => {
		if (event.offsetY >= this.buttonCenterY - this.buttonRadius
			&& event.offsetY <= this.buttonCenterY + this.buttonRadius)
		{
			if (event.offsetX >= this.plusCenterX - this.buttonRadius
				&& event.offsetX <= this.plusCenterX + this.buttonRadius)
			{
				if(BetObject.currentBet < BetObject.userAmount) {
					BetObject.currentBet++;
				}
			}
			else if (event.offsetX >= this.minusCenterX - this.buttonRadius
				&& event.offsetX <= this.minusCenterX + this.buttonRadius)
			{
				if(BetObject.currentBet - 1 > 0) BetObject.currentBet--;
			}
		}

		this.drawScore("Bet", BetObject.currentBet);
	});
}

BetCanvas.prototype.changeAmount = function(BetObject, coefficient) {
	if(coefficient) {
		BetObject.userAmount += BetObject.lastBet * coefficient;
	} else {
		BetObject.userAmount -= BetObject.lastBet;		
	}
	this.drawScore("Amount", BetObject.userAmount);
}

//user amount an bet
let userAssets = new UserAssets();

//canvas for user amount view
let amountCanvas = new BetCanvas();
amountCanvas.createBetCanvas();
amountCanvas.drawScore("Amount", userAssets.userAmount);

//canvas for user bet view
let betCanvas = new BetCanvas();
betCanvas.createBetCanvas();
betCanvas.drawScore("Bet", userAssets.currentBet);
betCanvas.drawButtons();
betCanvas.activateButtons(userAssets);