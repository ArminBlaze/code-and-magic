window.renderStatistics = function (ctx, names, times) {
  var canvas = document.querySelector('canvas');
  var canvasWidth = canvas.offsetWidth;
//  console.log(canvasWidth);
  
  //размещаем статистику по центру
  var statWidth = 400;
  var statHeight = 270;
//  var statX = 150; 
  var statX = canvasWidth/2 - statWidth/2; 
  var statY = 10;
  
  //тень
  ctx.shadowColor = 'black';
  ctx.shadowOffsetY = 3;
  ctx.shadowOffsetX = 3;
  ctx.shadowBlur = 5;
  
  //окно статистики и обводка
  ctx.strokeRect(statX, statY, statWidth, statHeight);
  ctx.fillStyle = 'white';
  ctx.fillRect(statX, statY, statWidth, statHeight);
  
  //текст
  var fontSize = 16;
  var padding = 15;
  var lineHeight = fontSize * 1.5;
  
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  
  ctx.font = fontSize + 'px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', statX + 15, statY + lineHeight);
  ctx.fillText('Список результатов:', statX + 15, statY + lineHeight*2);
  
  ///графики
  var barX = statX+padding;
  var barY = 80;
  var barMaxWidth = 150;
  var barsMaxHeight = statHeight - padding - (barY - statY) ;
  
  var numberOfBars = 4;
  
  var barHeight = fontSize*2;
  
  //распределяем равномерно по высоте блоки в зависимости от доступной высоты, кол-ва блоков и их количества
  var barLineHeight = ( barsMaxHeight - (numberOfBars * barHeight) )/3;
  barLineHeight+=barHeight;
  
  var timesAndNames = [];
  //определяем худшее время - это будет самый длинный график
//  и закидываем время и имена в один общий массив
  var maxTime = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    var name = names[i];
    console.log(name + ": " + time);
    if(time > maxTime) maxTime = time;
    timesAndNames.push({name: name,
                       time: time});
  }
  
  console.log(maxTime);
  console.log(timesAndNames);
  
  //определяем пропорцию для масштабирования относительно худшего результата
  var proportion = barMaxWidth / maxTime;
  
  
  //сортируем в порядке возрастания times timesAndNames
  
  timesAndNames.sort(function (a, b) {
    return a.time - b.time;
  })
  
  
  
  
  //рисуем графики
  for (var i = 0; i < timesAndNames.length; i++) {
    var time = timesAndNames[i].time;
    var name = timesAndNames[i].name;
    if(name == "Вы") ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    else ctx.fillStyle = 'blue';
    ctx.fillRect(barX, barY + barLineHeight*i, time * proportion, barHeight);
    ctx.fillText(name, barX + barMaxWidth + padding, barY + barLineHeight*i + (barHeight/2 + fontSize/2 -2) );
  }
}
