let slotbones;
const LAUNCH_BUTTON = document.getElementById("launch");

LAUNCH_BUTTON.addEventListener("click", function() {
	if(LAUNCH_BUTTON.value === "Start") {
		MAIN_BLOCK.style.backgroundImage = "none";
		LAUNCH_BUTTON.value = "Stop";
		LAUNCH_BUTTON.innerHTML = "Stop";

		if(slotbones) {
			slotbones.clear();
		}

		slotbones = new SlotBones();
		slotbones.create();
		slotbones.draw();

		userAssets.lastBet = userAssets.currentBet;
		amountCanvas.changeAmount(userAssets);
	} else {
		LAUNCH_BUTTON.setAttribute("disabled", "disabled");

		slotbones.stop(userAssets, betCanvas, amountCanvas, LAUNCH_BUTTON);
	}
});