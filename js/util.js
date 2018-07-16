'use strict';

(function () { 
	
	var wizards = {
			names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
			surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
			coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
			eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
			fireballsColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
		};
	
	function pickRandomFromArr (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	};
	
	function onError (message) {
		console.error(message);
			
		var errorDiv = document.querySelector('.errorDiv');

//		if(errorDiv) document.removeChild(errorDiv);

		if(!errorDiv) {
			errorDiv = document.createElement('div');
			errorDiv.style = '\
				z-index: 100;\
				margin: 0 auto;\
				text-align: center;\
				background-color: red;\
				position: absolute;\
				top: 0;\
				left: 0;\
				right: 0;\
				font-size: 30px;\
			';
		}
		
		errorDiv.textContent = message;
		document.body.appendChild(errorDiv);
	}
	
	window.util = {
		wizards: wizards,
		//ф-ция выбора случайного значения из массива. Принимает массив в качестве параметра
		pickRandomFromArr: pickRandomFromArr,
		onError: onError
	};

})();