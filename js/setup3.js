'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var wizardsTemplate = document.querySelector('#similar-wizard-template').content;

var wizards = {
  names: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
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
