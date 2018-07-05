// Setup Module
'use strict';

(function () { 
	var setup = document.querySelector('.setup');
	var wizards = window.util.wizards;

	var similarList = document.querySelector('.setup-similar-list');
	var wizardsTemplate = document.querySelector('#similar-wizard-template').content;

	var fragment = document.createDocumentFragment();

	for (var i = 0; i < 4; i++) {
		var wizard = wizardsTemplate.cloneNode(true);
		fragment.appendChild(createWizardElem(wizard));
	}

	similarList.appendChild(fragment);

	document.querySelector('.setup-similar').classList.remove('hidden');

	function createWizardElem(elem) {
		var name = elem.querySelector('.setup-similar-label');
		var wizardCoat = elem.querySelector('.wizard-coat');
		var wizardEyes = elem.querySelector('.wizard-eyes');

		var wizardParams = generateRandomParams();

		name.textContent = wizardParams.names + ' ' + wizardParams.surnames;
		wizardCoat.style.fill = wizardParams.coatColors;
		wizardEyes.style.fill = wizardParams.eyesColors;

		return elem;
	}

	function generateRandomParams() {
		var wizardParams = {};
		

		for (var prop in wizards) {
			if (wizards.hasOwnProperty(prop)) {
	//      var item = wizards[prop][Math.floor(Math.random() * wizards[prop].length)];
				var item = window.util.pickRandomFromArr( wizards[prop] );
				wizardParams[prop] = item;
			}
		}
		return wizardParams;
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


