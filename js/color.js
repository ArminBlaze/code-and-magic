'use strict';

(function () { 
	var setup = document.querySelector('.setup');
	var setupPlayer = setup.querySelector('.setup-player');
	var wizards = window.util.wizards;
	
	setupPlayer.addEventListener('click', onWizardClick);

	function onWizardClick (e) {
		var target = e.target;
		console.log(target);

		if(target.classList.contains('wizard-coat')) {
			var color = generateRandomParam("coatColors");
			console.log(color);
		} else if (target.classList.contains('wizard-eyes')) {
			var color = generateRandomParam("eyesColors");
			console.log(color);
		} else if (target.classList.contains('setup-fireball')) {
			var color = generateRandomParam("fireballsColors");
			console.log(color);
			target.parentNode.style.backgroundColor = color;

			return;
		}

		target.style.fill = color;
	}

	function generateRandomParam(prop) {
		if(!wizards[prop]) return;

	//  var item = pickRandomFromArr( wizards[prop] );
		var item = window.util.pickRandomFromArr( wizards[prop] );

		return item;
	}
})();