'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  //  var setupWizard = setup.querySelector('.setup-wizard');

  var ESC_KEYCODE = 27;

  setupOpen.addEventListener('click', openPopup);
  setupClose.addEventListener('click', closePopup);

  userNameInput.addEventListener('invalid', onInputInvalid);
  userNameInput.addEventListener('input', onInputInput);


  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style = '';
  }

  function onPopupEscPress(e) {
    if (e.target.classList.contains('setup-user-name')) {
      return;
    } // клик на активном инпуте игнорируем
    if (e.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  function onInputInvalid(e) {
    var target = e.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Пожалуйста, заполните это поле');
    } else if (target.validity.tooShort) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else {
      target.setCustomValidity('');
    }
  }

  // для Edge 16 (и IE), он не поддерживает minlength
  // также можно написать один обработчик через value.length и сравнение с получением атрибутов minlength & maxlength
  function onInputInput(e) {
    var target = e.target;
    //    console.log(target.value.length);
    if (target.value.length < 2) {
      //      console.log('length < 2');
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  }

  // 06 - Form AJAX send
  var form = document.querySelector('.setup-wizard-form');

  form.addEventListener('submit', onFormSubmit);

  function onFormSubmit(e) {
    e.preventDefault();

    var data = new FormData(form);

    window.backend.save(data, onLoad, window.util.onError);

    function onLoad(response) {
      console.log(response);
      closePopup();
    }
  }


})();
