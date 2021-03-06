'use strict';

(function () {

// получать с сервера данные с помощью объекта XMLHttpRequest
// или с помощью JSONP, обрабатывать полученные запросы и
// передавать полученную информацию в функцию обратного
// вызова

//	var CALLBACK_NAME = '__jsonpCallback';
//	var DATA_URL = 'https://1510.dump.academy/code-and-magick/data';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';

  function request(options) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        try	{
          var data = JSON.parse(xhr.response);
          options.onLoad(data);
          //					console.log(data);
        } catch (err) {
          //					console.log(err.message);
          options.onError('Ошибка обработки JSON: ' + err.message);
        }
      } else {
        options.onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      options.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      options.onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open(options.method, options.url);
    xhr.send(options.data);
  }


  function load(onLoad, onError) {
    request({
      url: LOAD_URL,
      method: 'GET',
      onLoad: onLoad,
      onError: onError
    });
  }

  function save(data, onLoad, onError) {
    request({
      url: SAVE_URL,
      method: 'POST',
      onLoad: onLoad,
      onError: onError,
      data: data
    });
  }


  window.backend = {
    load: load,
    save: save
  };
})();
