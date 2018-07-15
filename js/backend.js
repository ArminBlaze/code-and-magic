'use strict';

(function () { 

//получать с сервера данные с помощью объекта XMLHttpRequest
//или с помощью JSONP, обрабатывать полученные запросы и
//передавать полученную информацию в функцию обратного
//вызова
	
//	var CALLBACK_NAME = '__jsonpCallback';
//	var DATA_URL = 'https://1510.dump.academy/code-and-magick/data';
	var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
	var SAVE_URL = 'https://js.dump.academy/code-and-magick';
	
	function load (onLoad, onError) { //XHR ver
		var xhr = new XMLHttpRequest();
		
		xhr.addEventListener('load', function() {
			if(xhr.status === 200) {
				try	{
					var data = JSON.parse(xhr.response);
					onLoad(data);
//					console.log(data);
				} 
				catch(err) {
//					console.log(err.message);
					onError('Ошибка обработки JSON: ' + err.message);
				}
			} 
			else {
				onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
			}
		});
		
		xhr.addEventListener('error', function() {
			onError('Произошла ошибка соединения');
		});
		
		xhr.addEventListener('timeout', function() {
			onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
		});
		
		xhr.timeout = 10000;
		xhr.open('GET', LOAD_URL);
		xhr.send();
	}
	
	
//отправлять данные игрока на сервер, обрабатывать ошибки и
//скрывать форму редактирования персонажа, если ошибок не
//произошло
	function save (data, onLoad, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		
		xhr.addEventListener('load', function() {
			if(xhr.status === 200) {
				onLoad(xhr.response);
			}
		});
		
		xhr.open('POST', SAVE_URL);
		xhr.send(data);
	}
	
	window.backend = {
		load: load,
		save: save
	}
})();
