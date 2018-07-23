'use strict';

(function () { 
	var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
	];
	
	
	var setup = document.querySelector('.setup');
	var setupPlayer = setup.querySelector('.setup-player');
	var coatColor, eyesColor;
	
	setupPlayer.addEventListener('click', onWizardClick);

	var updateWizardsWithDelay = window.util.debounce(window.setup.updateWizards, 500);
	
	function onWizardClick (e) {
		var target = e.target;
		var color, colors;

		if(target.classList.contains('wizard-coat')) {
			color = window.util.pickRandomFromArr( COAT_COLORS );
			coatColor = color;
			changeFill(target, color);
		} else if (target.classList.contains('wizard-eyes')) {
			color = window.util.pickRandomFromArr( EYES_COLORS );
			eyesColor = color;
			changeFill(target, color);
		} else if (target.classList.contains('setup-fireball')) {
			target = target.parentNode;
			color = window.util.pickRandomFromArr( FIREBALL_COLORS );
			
			changeBackground(target, color);
		}

		updateWizardsWithDelay();
	}
	
//	function updateWizardsWithDelay () {
//		window.util.debounce(window.setup.updateWizards, 500);
//	}
	
	
	
	function changeFill (elem, color) {
		elem.style.fill = color;
	}
	
	function changeBackground (elem, color) {
		elem.style.backgroundColor = color;
	}
	
//	function colorizeElement (elem, colors, callback) {
//		if(arguments.length < 3) return;
//		
//		var color = window.util.pickRandomFromArr( colors );
//		
//		callback(elem, color);
//	}

//	function generateRandomParam(prop) {
//		if(!wizards[prop]) return;
//
//	//  var item = pickRandomFromArr( wizards[prop] );
//		var item = window.util.pickRandomFromArr( wizards[prop] );
//
//		return item;
//	}
	
//	window.color = {
//		get wizard() {
//			return {
//				coatColor: coatColor, 
//				eyesColor: eyesColor
//			};
//  	};
//	};
//	
	Object.defineProperty(window, "color", {
		get: function() {
			return {
					coat: coatColor, 
					eyes: eyesColor
				};
		}
	});
})();