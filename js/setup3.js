'use strict';
var setup = document.querySelector('.setup');
//setup.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var wizardsTemplate = document.querySelector('#similar-wizard-template').content;

var wizards = {
  names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballsColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

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
      var item = wizards[prop][Math.floor(Math.random() * wizards[prop].length)];
      wizardParams[prop] = item;
    }
  }
  return wizardParams;
}

//////////////////////////////////////////////
// 04 - Events
//////////////////////////////////////////////
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupPlayer = setup.querySelector('.setup-player');
var setupWizard = setup.querySelector('.setup-wizard');
var coat = setupWizard.querySelector('.wizard-coat');

var ESC_KEYCODE = 27;

setupOpen.addEventListener('click', openPopup);
setupClose.addEventListener('click', closePopup);

userNameInput.addEventListener('invalid', onInputInvalid);
userNameInput.addEventListener('input', onInputInput);

setupPlayer.addEventListener('click', onWizardClick);

function openPopup (e) {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

function closePopup (e) {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

function onPopupEscPress (e) {
  if( e.target.classList.contains('setup-user-name') ) return;
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

function onWizardClick (e) {
  var target = e.target;
  console.log(target);
  
  if(target.classList.contains('wizard-coat')) {
    var color = generateRandomParam("coatColors");
    console.log(color);
  } else if (target.classList.contains('wizard-eyes')) {
    var color = generateRandomParam("eyesColors");
    console.log(color);
  } else if (target.classList.contains('setup-fireball')) {
    var color = generateRandomParam("fireballsColors");
    console.log(color);
    target.parentNode.style.backgroundColor = color;
    
    return;
  }
  
  target.style.fill = color;
}


function generateRandomParam(prop) {
  var param;
  if(!wizards[prop]) return;
  
  var item = wizards[prop][Math.floor(Math.random() * wizards[prop].length)];
  param = item;
   
  return param;
}