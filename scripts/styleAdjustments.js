// Метод для настройки позиции кнопки запуска спина
function adjustButtonPosition() {
  const windowHeight = window.innerHeight;

  // Применяем отступ к кнопке, устанавливая абсолютное позиционирование и отступы
  this.spinButton.style.position = 'absolute';

  const widthMultiplier =
    {
      [900 <= windowHeight && windowHeight < 1000]: 220, // + perfect
      [800 <= windowHeight && windowHeight < 900]: 190, // + perfect
      [700 <= windowHeight && windowHeight < 800]: 166, // + perfect
      [windowHeight < 700]: 145, // + perfect
    }[true] || 215; //* + perfect

  const heightMultiplier =
    {
      [900 <= windowHeight && windowHeight < 1000]: 90, // + perfect
      [800 <= windowHeight && windowHeight < 900]: 78, // + perfect
      [700 <= windowHeight && windowHeight < 800]: 68, // + perfect
      [windowHeight < 700]: 63, // + perfect
    }[true] || 90; //* + perfect

  const bottomMultiplier =
    {
      [900 <= windowHeight && windowHeight < 1000]: -100, // + perfect
      [800 <= windowHeight && windowHeight < 900]: -85, // + perfect
      [700 <= windowHeight && windowHeight < 800]: -75, // + perfect
      [windowHeight < 700]: -70, // + perfect
    }[true] || -96; //* + perfect

  this.spinButton.style.bottom = `${bottomMultiplier}px`; //? `-96px`
  this.spinButton.style.left = `71%`; //* + perfect
  this.spinButton.style.height = `${heightMultiplier}px`; //? `90px`
  this.spinButton.style.width = `${widthMultiplier}px`; //? '215px'
}

// Метод для подстройки размеров канваса под размеры окна
function adjustCanvasSize() {
  const windowHeight = window.innerHeight;
  const heightMultiplier = windowHeight > 1000 ? 0.48 : 0.49; //* + perfect
  const marginTopMultiplier =
    {
      [900 <= windowHeight && windowHeight < 1000]: 74,
      [800 <= windowHeight && windowHeight < 900]: 65,
      [700 <= windowHeight && windowHeight < 800]: 56,
      [windowHeight < 700]: 44,
    }[true] || 80; //* + perfect
  this.canvas.height = windowHeight * heightMultiplier;
  this.canvas.style.marginTop = `${marginTopMultiplier}px`;

  const windowMultiplier = 0.84; //* + perfect
  this.canvas.width = windowHeight * windowMultiplier;
}

// Передаем методы настройки стилей как часть класса SlotMachine
SlotMachine.prototype.adjustButtonPosition = adjustButtonPosition;
SlotMachine.prototype.adjustCanvasSize = adjustCanvasSize;
