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


var personages = createPersonages(4);
var personagesElements = [];

for (var i = 0; i < personages.length; i++) {
  personagesElements.push(createPersonageElem(personages[i]));
}

//var fragment = document.createDocumentFragment();


similarList.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

function createPersonages(number) {
  var arr = [];
  for (var i = 0; i < number; i++) {
    var wizardParams = generateRandomPersonage();

    arr.push(wizardParams);
  }
  return arr;
}

function generateRandomPersonage() {
  var wizardParams = {};

  for (var prop in wizards) {
    if (wizards.hasOwnProperty(prop)) {
      var item = wizards[prop][Math.floor(Math.random() * wizards[prop].length)];
      wizardParams[prop] = item;
    }
  }
  return wizardParams;
}

function createPersonageElem(personage) {
  var elem = wizardsTemplate.cloneNode(true);
  var name = elem.querySelector('.setup-similar-label');
  var wizardCoat = elem.querySelector('.wizard-coat');
  var wizardEyes = elem.querySelector('.wizard-eyes');

     
//    parent.appendChild(generateWizard(wizard));

  name.textContent = personage.names + ' ' + personage.surnames;
  wizardCoat.style.fill = personage.coatColors;
  wizardEyes.style.fill = personage.eyesColors;

  return elem;
}
