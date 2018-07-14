'use strict';

(function () { 

//получать с сервера данные с помощью объекта XMLHttpRequest
//или с помощью JSONP, обрабатывать полученные запросы и
//передавать полученную информацию в функцию обратного
//вызова
	
	var CALLBACK_NAME = '__jsonpCallback';
//	var DATA_URL = 'https://1510.dump.academy/code-and-magick/data';
	var DATA_URL = 'https://js.dump.academy/code-and-magick/data';
	
	window[CALLBACK_NAME] = function(data) {
		console.log(data);
	}
	
	
	function load (onLoad, onError) { //JSONP ver
		var loader = document.createElement('script');
		loader.src = DATA_URL + '?callback=' + CALLBACK_NAME;
		
		loader.addEventListener('error', function(){
			console.log("Ошибка при загрузке скрипта JSONP");
		})
		
		document.body.appendChild(loader);
		
		
	}
	
//отправлять данные игрока на сервер, обрабатывать ошибки и
//скрывать форму редактирования персонажа, если ошибок не
//произошло
	function save (data, onLoad, onError) {
		
	}
	
	window.backend = {
		load: load,
		save: save
	}
})();