// Setup Module
'use strict';

(function () { 
	var setup = document.querySelector('.setup');
	var wizards;
	var similarWizards;
	var WIZARDS_NUMBER = 4;
	
	window.backend.load(onLoad, window.util.onError);
	
	function onLoad (data) {
		wizards = data;
		console.log(wizards);
		
		//из wizards выбрать 4 волшебников и полученный массив записать в similarWizards
		similarWizards = pickRandomAndUniqueFromArr(wizards, WIZARDS_NUMBER);
		console.log(similarWizards);
		
		drawWizards();
	}
	
	function drawWizards () {
		var similarList = document.querySelector('.setup-similar-list');
		similarList.innerHTML = "";
		var wizardsTemplate = document.querySelector('#similar-wizard-template').content;

		var fragment = document.createDocumentFragment();

		for (var i = 0; i < similarWizards.length; i++) {
			var wizard = wizardsTemplate.cloneNode(true);
			fragment.appendChild(createWizardElem(wizard, similarWizards[i]));
		}

		similarList.appendChild(fragment);

		if(document.querySelector('.setup-similar').classList.contains('hidden')) {
			document.querySelector('.setup-similar').classList.remove('hidden');
		}
	}
	
	function getRank (wizard) {
		
	}

	function pickRandomAndUniqueFromArr (arr, num) {
		var newArr = [];
		
		if(num >= arr.length) num = arr.length;
		
		for (var i = 0; i < num; i++) {
			while(arr.length - newArr.length > 0) {
				var item = window.util.pickRandomFromArr(arr);
				if(!~newArr.indexOf(item)) {
					newArr.push(item);
					break;
				}
			}
		}
		
		return newArr;
	}
	
	//////////////////////////////////////

	function createWizardElem(elem, wizardParams) {
		var name = elem.querySelector('.setup-similar-label');
		var wizardCoat = elem.querySelector('.wizard-coat');
		var wizardEyes = elem.querySelector('.wizard-eyes');

		name.textContent = wizardParams.name;
		wizardCoat.style.fill = wizardParams.colorCoat;
		wizardEyes.style.fill = wizardParams.colorEyes;

		return elem;
	}
	
	//////////////////
//	05 - draggable items
	
	var shopElement = document.querySelector('.setup-artifacts-shop'); //магазин
	var draggedItem = null;
	
	//элемент у которого есть свойство dropzone (инвентарь)
	var artifactsElement = document.querySelector('.setup-artifacts');  
	
	//делегирование. При клике на любой Img элемент запускаем обработчик.
	shopElement.addEventListener('dragstart', function(e) {
		if(e.target.tagName.toLowerCase() !== 'img') {
			return;
		}
		
		draggedItem = e.target;
		//перетаскиваем как текст, значение - alt картинки
		e.dataTransfer.setData('text/plain', e.target.alt);
		e.dataTransfer.setData('parent', 'shop');
		artifactsElement.style.outline = "2px dashed red";
	});
	
	artifactsElement.addEventListener('dragstart', function(e) {
		if(e.target.tagName.toLowerCase() !== 'img') {
			return;
		}
		
		draggedItem = e.target;
		//перетаскиваем как текст, значение - alt картинки
		e.dataTransfer.setData('text/plain', e.target.alt);
		e.dataTransfer.setData('parent', 'inventory');
		artifactsElement.style.outline = "2px dashed green";
	})
	
	
	document.addEventListener('dragover', function (e) {
		e.preventDefault();
		return false;
	});
	
	artifactsElement.addEventListener('drop', function(e) {
		e.target.style.backgroundColor = '';
		e.preventDefault();
		
		if(!checkCell(e.target)) return;
		
		console.log(e.dataTransfer.getData('parent'));
		
		if(e.dataTransfer.getData('parent') === 'shop') {
			e.target.appendChild(draggedItem.cloneNode(true));
		}
		else if(e.dataTransfer.getData('parent') === 'inventory') {
			e.target.appendChild(draggedItem);
		}
		
		draggedItem = null;
	});
	
	artifactsElement.addEventListener('dragenter', function(e) {
		if(!checkCell(e.target)) return;
		
		e.target.style.backgroundColor = 'yellow';
		e.preventDefault();
	});
	
	artifactsElement.addEventListener('dragleave', function(e) {
		e.target.style.backgroundColor = '';
		e.preventDefault();
	});
	
	document.addEventListener('dragend', function(e) {
		artifactsElement.style.outline = "";
	});
	
	function checkCell (target) {
		if(!draggedItem) return false;
		if(!target.classList.contains('setup-artifacts-cell')) return false;
		if(target.childNodes.length > 0) return false;
		
		return true;
	}
})();
