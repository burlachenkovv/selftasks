let SlotBones = function() {
	this.cols = new Array();
}

SlotBones.prototype.create = function() {
	let columns = 0;

	while(columns < COLS_COUNT) {
		columns++;

		this.cols.push((function() {
			let col = new Column();
			col.createCanvas();
			col.create();
			return col;
		})());
	}
}

SlotBones.prototype.draw = function() {
	this.cols.forEach(function(columns) {
		columns.draw();
		columns.animation();
	});
}

SlotBones.prototype.stop = function(userAssetsObject, betCanvasObject, amountCanvasObject, button) {
	this.cols.forEach(function(columns) {
		columns.slow();
	});

	setTimeout(() => {
		this.cols.forEach(function(columns) {
			columns.stop();				
		});

		let winArray = this.checkCombo();
		if(winArray.length) {
			this.drawCombo(winArray, userAssetsObject, amountCanvasObject);
		} else {
		 	if(userAssetsObject.currentBet > userAssetsObject.userAmount) {
				userAssetsObject.currentBet = userAssetsObject.userAmount;
				betCanvasObject.drawScore("Bet", userAssetsObject.currentBet);
			}
		}

		if(!userAssetsObject.userAmount) {
			this.loseGame();
		} else {
			button.removeAttribute("disabled");
			button.value = "Start";
			button.innerHTML = "Start";
		}

	}, 2000);
}

SlotBones.prototype.clear = function() {
	this.cols.forEach(function(columns) {
		columns.clearCanvas();
	});
}

SlotBones.prototype.checkCombo = function() {
	let winArray = [];
	let checkEqual = false;
	let winPicNumber = this.cols[0].pictures.length - 3;
	
	mainFor: for(let i = 0; i < this.cols.length; i++) {
		winArray.push(this.cols[i].pictures[winPicNumber]);

		for(let k = i+1; k < this.cols.length; k++) {
			checkEqual = (function(arg1, arg2) {
				return arg1 === arg2;
			})(this.cols[i].pictures[winPicNumber].name, this.cols[k].pictures[winPicNumber].name);

			if(checkEqual && k < (this.cols.length-1)) {
				winArray.push(this.cols[k].pictures[winPicNumber]);
			} else if (!checkEqual && winArray.length >= 3) {
				return winArray;
			} else if (checkEqual && k === (this.cols.length-1) && winArray.length >= 2) {
				winArray.push(this.cols[k].pictures[winPicNumber]);
				return winArray;
			} else {
				winArray = [];
				continue mainFor;
			}
		}
	}	
	winArray = [];
	return winArray;
}

SlotBones.prototype.drawCombo = function(winArray, userAssetsObject, amountCanvasObject) {
	winArray.forEach(function(winPicture) {
		winPicture.isWin = true;
		winPicture.clear(winPicture.ctx);
		winPicture.draw(winPicture.ctx);
	});

	amountCanvasObject.changeAmount(userAssetsObject, winArray.length - 1);
}

SlotBones.prototype.loseGame = function() {
	setTimeout(() => {
		this.clear();
		MAIN_BLOCK.style.backgroundImage = "url(./img/youlose.jpg)";
	}, 1000);
}