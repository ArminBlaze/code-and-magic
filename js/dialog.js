'use strict';

(function () {
	var setup = document.querySelector('.setup');
	var setupOpen = document.querySelector('.setup-open');
	var setupClose = setup.querySelector('.setup-close');
	var userNameInput = setup.querySelector('.setup-user-name');
	var setupWizard = setup.querySelector('.setup-wizard');

	var ESC_KEYCODE = 27;

	setupOpen.addEventListener('click', openPopup);
	setupClose.addEventListener('click', closePopup);

	userNameInput.addEventListener('invalid', onInputInvalid);
	userNameInput.addEventListener('input', onInputInput);


	function openPopup (e) {
		setup.classList.remove('hidden');
		document.addEventListener('keydown', onPopupEscPress);
	};

	function closePopup (e) {
		setup.classList.add('hidden');
		document.removeEventListener('keydown', onPopupEscPress);
		setup.style = "";
	};

	function onPopupEscPress (e) {
		if( e.target.classList.contains('setup-user-name') ) return; //клик на активном инпуте игнорируем
		if(e.keyCode === ESC_KEYCODE) {
			closePopup();
		}
	}

	function onInputInvalid (e) {
		var target = e.target;
		if(target.validity.valueMissing) {
			target.setCustomValidity('Пожалуйста, заполните это поле');
		}
		else if(target.validity.tooShort) {
			target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
		}
		else if(target.validity.tooLong) {
			target.setCustomValidity('Имя не должно превышать 25-ти символов');
		}
		else {
			target.setCustomValidity('');
		}
	};

	// для Edge 16 (и IE), он не поддерживает minlength
	// также можно написать один обработчик через value.length и сравнение с получением атрибутов minlength & maxlength
	function onInputInput (e) {
		var target = e.target;
		console.log(target.value.length);
		if(target.value.length < 2) {
			console.log("length < 2");
			target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
		}
		else {
			target.setCustomValidity('');
		}
	}
	
	//05 - D'n'd
	var popupIcon = setup.querySelector('.setup-user-pic');
	
	popupIcon.addEventListener('mousedown', onUserpicMousedown);
	
	function onUserpicMousedown (e) {
		e.preventDefault();
		var coords = setup.getBoundingClientRect();
		console.log(coords);
		
		var shiftX = e.pageX - coords.left;
		var shiftY = e.pageY - coords.top;
		
		console.log(shiftX, shiftY);
		
//		 подготовить к перемещению
//		 2. разместить на том же месте, но в абсолютных координатах
		setup.style.position = 'absolute';
		setup.style.transform = "none";
		onMouseMove(e);
		
//		 переместим в body, чтобы элемент был точно не внутри position:relative
		document.body.appendChild(setup);
		
		setup.style.zIndex = 1000; // показывать над другими элементами
		
		
		function onMouseMove(e) {
			setup.style.left = e.pageX - shiftX + 'px';
			setup.style.top = e.pageY - shiftY + 'px';
		}
		
//		 3, перемещать по экрану
//		document.onmousemove = function(e) {
//			moveAt(e);
//		};
		
		document.addEventListener('mousemove', onMouseMove);

		// 4. отследить окончание переноса
//		document.onmouseup = function() {
//			document.onmousemove = null;
//			document.onmouseup = null;
//		};
		
		document.addEventListener('mouseup', onMouseUp);
		
		function onMouseUp () {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}
		
		popupIcon.ondragstart = function() {
			return false;
		};
	}
	
// ball.onmousedown = function(e) { // 1. отследить нажатие
//
//		var coords = getCoords(ball);
//		var shiftX = e.pageX - coords.left;
//		var shiftY = e.pageY - coords.top;
//
//		// подготовить к перемещению
//		// 2. разместить на том же месте, но в абсолютных координатах
//		ball.style.position = 'absolute';
//		moveAt(e);
//
//		// переместим в body, чтобы мяч был точно не внутри position:relative
//		document.body.appendChild(ball);
//
//		ball.style.zIndex = 1000; // показывать мяч над другими элементами
//
//		// передвинуть мяч под координаты курсора
//		// и сдвинуть на половину ширины/высоты для центрирования
//		function moveAt(e) {
//			ball.style.left = e.pageX - shiftX + 'px';
//			ball.style.top = e.pageY - shiftY + 'px';
//		}
//
//		// 3, перемещать по экрану
//		document.onmousemove = function(e) {
//			moveAt(e);
//		};
//
//		// 4. отследить окончание переноса
//		document.onmouseup = function() {
//			document.onmousemove = null;
//			document.onmouseup = null;
//		};
//
//
//
//		//вспомогательная ф-ция получения координат с прокруткой
//		function getCoords(elem) {   // кроме IE8-
//			var box = elem.getBoundingClientRect();
//			return {
//				top: box.top + pageYOffset,
//				left: box.left + pageXOffset
//			};
//		}
//	}
//
//
//	//отмена перетаскивания HTML5 dragstart
//	ball.ondragstart = function() {
//		return false;
//	};
})();