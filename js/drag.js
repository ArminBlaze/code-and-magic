'use strict';

;(function () {
	//05 - D'n'd
	var setup = document.querySelector('.setup');
	var dialogHandler = setup.querySelector('.upload');
	var popupIcon = dialogHandler.querySelector('.setup-user-pic');
	
	
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
	var fileInput = dialogHandler.querySelector('input[type="file"]');
	var openIcon = document.querySelector('.setup-open-icon');
	
	
	dialogHandler.addEventListener('mousedown', onUserpicMousedown);
	
	function onUserpicMousedown (e) {
		var dragged = false;
		
//		console.log(e.target);
//		e.preventDefault();
//		var coords = getCoords(setup);
//		console.log(coords);
//		
//		var shiftX = e.pageX - coords.left;
//		var shiftY = e.pageY - coords.top;
//		
//		console.log(shiftX, shiftY);
		
//		 подготовить к перемещению
//		 2. разместить на том же месте, но в абсолютных координатах
//		setup.style.position = 'absolute';
//		setup.style.transform = "none";
//		onMouseMove(e);
		
//		 переместим в body, чтобы элемент был точно не внутри position:relative
//		document.body.appendChild(setup);
		
//		setup.style.zIndex = 1000; // показывать над другими элементами
		
		var startCoords = { // Находим начальные координаты
			x: e.clientX,
			y: e.clientY
		};
		
//		console.log(e.clientX, e.clientY);
		
		function onMouseMove(e) {
//			console.log("mouseMove");
//			console.log(e.clientX, e.clientY);
//			console.log(startCoords.x, startCoords.y);
			
			//фиксим баг Хрома с ложным mousemove
			if(e.clientX == startCoords.x && e.clientY == startCoords.y) { 
				console.log("same coords");
				return;
			}
//			debugger;
			dragged = true;
//			setup.style.left = e.pageX - shiftX + 'px';
//			setup.style.top = e.pageY - shiftY + 'px';
			
			var shift = { // Расстояние, на которое передвинулось окно
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = { // Новые начальные координаты после передвижения
        x: e.clientX,
        y: e.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px'; // Положение окна
			setup.style.left = (setup.offsetLeft - shift.x) + 'px'; // после передвижения
		}
		
		document.addEventListener('mousemove', onMouseMove);
		
		document.addEventListener('mouseup', onMouseUp);
		
		function onMouseUp () {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			
			if(dragged) {
				console.log('dragged');
				fileInput.addEventListener('click', onInputClick);
				
				function onInputClick (e) {
					console.log('click cancel');
					e.preventDefault();
					fileInput.removeEventListener('click', onInputClick);
					dragged = false;
				}
			}
		}
		
		dialogHandler.ondragstart = function() {
			return false;
		};
		
		function getCoords(elem) {   // кроме IE8-
			var box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		}
	}
	
	
	//09 - Images
	
	
	fileInput.addEventListener('change', onFileChange);
	
	function onFileChange (e) {
		console.log("file");
		
		var file = fileInput.files[0]; //первый файл в инпуте
		if(!file) return;
		
		console.log(file);
		var fileName = file.name.toLowerCase(); //имя файла
		console.log(fileName);
		var fileExt = fileName.split('.').pop();	//расширение добавленного в инпут файла
		console.log(fileExt);
		
		var matches = FILE_TYPES.some(function(item) { //есть ли расширение есть среди разрешенных
			console.log(fileExt, item);
			return fileExt === item;
		});
		
		console.log(matches);
		
		if(matches) {
			var reader = new FileReader();
			
			reader.addEventListener('load', function(){
				popupIcon.src = reader.result;
				openIcon.src = reader.result;
			});
			
			reader.readAsDataURL(file);
		}
	}
	
})();