'use strict';

;(function () {
	//05 - D'n'd
	var setup = document.querySelector('.setup');
	var popupIcon = setup.querySelector('.setup-user-pic');
	
	
	
	popupIcon.addEventListener('mousedown', onUserpicMousedown);
	
	function onUserpicMousedown (e) {
		e.preventDefault();
		var coords = getCoords(setup);
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
		
		document.addEventListener('mousemove', onMouseMove);
		
		document.addEventListener('mouseup', onMouseUp);
		
		function onMouseUp () {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}
		
		popupIcon.ondragstart = function() {
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
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
	var fileInput = setup.querySelector('input[type="file"]');
	var openIcon = document.querySelector('.setup-open-icon');
	
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