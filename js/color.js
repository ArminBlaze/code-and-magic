'use strict';

(function () { 
	var setup = document.querySelector('.setup');
	var setupPlayer = setup.querySelector('.setup-player');
	var wizards = window.util.wizards;
	
	setupPlayer.addEventListener('click', onWizardClick);

	function onWizardClick (e) {
		var target = e.target;
		console.log(target);
		var color;
		var callback;

		if(target.classList.contains('wizard-coat')) {
//			var color = generateRandomParam("coatColors");
//			console.log(color);
			color = ['red', 'green', 'blue'];
			callback = changeFill;
		} else if (target.classList.contains('wizard-eyes')) {
//			var color = generateRandomParam("eyesColors");
//			console.log(color);
			color = ['navy', 'teal', 'orange'];
			callback = changeFill;
		} else if (target.classList.contains('setup-fireball')) {
//			var color = generateRandomParam("fireballsColors");
//			console.log(color);
//			target.parentNode.style.backgroundColor = color;
			target = target.parentNode;
			color = ['yellow', 'black', 'aliceblue'];
			callback = changeBackground;
//			return;
		}

//		target.style.fill = color;
		colorizeElement(target, color, callback);
	}
	
	function changeFill (elem, color) {
		elem.style.fill = color;
	}
	
	function changeBackground (elem, color) {
		elem.style.backgroundColor = color;
	}
	
	function colorizeElement (elem, colors, callback) {
		if(arguments.length < 3) return;
		
		var color = window.util.pickRandomFromArr( colors );
		
		callback(elem, color);
	}

	function generateRandomParam(prop) {
		if(!wizards[prop]) return;

	//  var item = pickRandomFromArr( wizards[prop] );
		var item = window.util.pickRandomFromArr( wizards[prop] );

		return item;
	}
})();