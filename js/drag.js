'use strict';

(function () {
  // 05 - D'n'd
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');
  var popupIcon = dialogHandler.querySelector('.setup-user-pic');


  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileInput = dialogHandler.querySelector('input[type="file"]');
  var openIcon = document.querySelector('.setup-open-icon');


  dialogHandler.addEventListener('mousedown', onUserpicMousedown);

  function onUserpicMousedown(e) {
    var dragged = false;

    var startCoords = { // Находим начальные координаты
      x: e.clientX,
      y: e.clientY
    };

    function onMouseMove(e) {

      // фиксим баг Хрома с ложным mousemove
      if (e.clientX === startCoords.x && e.clientY === startCoords.y) {
        //        console.log('same coords');
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

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        fileInput.addEventListener('click', onInputClick);

        function onInputClick(e) {
          e.preventDefault();
          fileInput.removeEventListener('click', onInputClick);
          dragged = false;
        }
      }
    }

    dialogHandler.ondragstart = function () {
      return false;
    };

  }


  // 09 - Images


  fileInput.addEventListener('change', onFileChange);

  function onFileChange() {

    var file = fileInput.files[0]; // первый файл в инпуте
    if (!file) {
      return;
    }

    var fileName = file.name.toLowerCase(); // имя файла
    var fileExt = fileName.split('.').pop();	// расширение добавленного в инпут файла

    var matches = FILE_TYPES.some(function (item) { // есть ли расширение есть среди разрешенных
      return fileExt === item;
    });


    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        popupIcon.src = reader.result;
        openIcon.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

})();
