'use strict';
window.renderStatistics = function (ctx, names, times) {
  var canvas = document.querySelector('canvas');
  var canvasWidth = canvas.offsetWidth;
  //  console.log(canvasWidth);

  // размещаем статистику по центру
  var statWidth = 400;
  var statHeight = 270;
  //  var statX = 150; 
  var statX = canvasWidth / 2 - statWidth / 2;
  var statY = 10;

  // тень
  ctx.shadowColor = 'black';
  ctx.shadowOffsetY = 3;
  ctx.shadowOffsetX = 3;
  ctx.shadowBlur = 5;

  // окно статистики и обводка
  ctx.strokeRect(statX, statY, statWidth, statHeight);
  ctx.fillStyle = 'white';
  ctx.fillRect(statX, statY, statWidth, statHeight);

  // текст
  var fontSize = 16;
  var padding = 15;
  var lineHeight = fontSize * 1.5;

  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;

  ctx.font = fontSize + 'px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', statX + 15, statY + lineHeight);
  ctx.fillText('Список результатов:', statX + 15, statY + lineHeight * 2);

  // /графики
  var barX = statX + padding;
  var barY = 80;
  //  var barMaxWidth = 150;

  var barsMaxWidth = statWidth - padding - (barX - statX);
  var barsMaxHeight = statHeight - padding - (barY - statY) - lineHeight;
  var barBottomCoord = statY + statHeight - padding - lineHeight;
  var textBottomCoord = statY + statHeight - padding;

  var numberOfBars = 4;

  // console.log(barsMaxWidth + ' barsMaxWidth');
  var barPadding = barsMaxWidth * 0.1;
  // рассчитываем ширину блока
  var barWidth = (barsMaxWidth - (numberOfBars - 1) * barPadding) / numberOfBars;

  // распределяем равномерно по высоте блоки в зависимости от доступной высоты, кол-ва блоков и их количества
  var barStep = (barsMaxWidth - numberOfBars * barWidth) / (numberOfBars - 1);
  barStep += barWidth;

  // определяем худшее время - это будет самый длинный график
  function getMaxElement(arr) {
    var max = -1;
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item > max) {
        max = item;
      }
    }
    return max;
  }

  var maxTime = getMaxElement(times);


  // /////////////////////////////////////////////

  // console.log('Before Sort:');
  // console.log(times);
  // console.log(names);

  // сортировка, потом выделим в отдельную ф-цию
  var timesAndNames = [];
  for (var j = 0; j < times.length; j++) {
    var time = times[j];
    var name = names[j];
    timesAndNames.push({name: name,
      time: time});
  }

  // сортируем в порядке возрастания time timesAndNames
  timesAndNames.sort(function (a, b) {
    return a.time - b.time;
  });

  // сортируем исходные массивы
  for (var i = 0; i < timesAndNames.length; i++) {
    names[i] = timesAndNames[i].name;
    times[i] = timesAndNames[i].time;
  }


  // console.log('After Sort:');
  // console.log(timesAndNames);
  // console.log(times);
  // console.log(names);
  // //////////////////////////////////////////////////////


  // определяем пропорцию для масштабирования относительно худшего результата
  var proportion = barsMaxHeight / maxTime;
  // console.log(proportion + ' proportion');


  // делаем вертикальные графики
  for (var k = 0; k < timesAndNames.length; k++) {
    var time2 = timesAndNames[k].time;
    var name2 = timesAndNames[k].name;
    // console.log(name2 + ': ' + time2);
    if (name2 === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'blue';
    }
    ctx.fillRect(barX + barStep * k, barBottomCoord, barWidth, -time2 * proportion);
    ctx.fillText(name2, barX + barStep * k, textBottomCoord);
  }
};
