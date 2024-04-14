class SlotMachine {
  // Конструктор класса, принимающий идентификатор канваса
  constructor(canvasId) {
    // Получаем ссылку на канвас и контекст рисования
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    // Получаем ссылку на кнопку запуска спина и добавляем обработчик события
    this.spinButton = document.getElementById('spinButton');
    this.spinButton.addEventListener('click', () => this.spin());
    // Инициализируем массив барабанов и флаг состояния вращения
    this.reels = [[], [], [], [], []];
    this.isSpinning = false;
    // Загружаем изображения символов
    this.symbolImages = symbolImages;
    // Вызываем метод для настройки размера канваса
    this.adjustCanvasSize();

    this.adjustButtonPosition();

    this.populateReels();
  }

  // Метод для запуска вращения барабанов
  spin() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.animate();
    }
  }

  animate() {
    const spinDuration = 3000; // Продолжительность вращения в миллисекундах
    const startTime = Date.now();
    const spinInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        this.isSpinning = false;
        // this.populateReels(); // Заполняем барабаны случайными символами
        this.draw();
      } else {
        // Анимация перемещения символов вверх
        this.moveSymbolsUp();
        this.draw();
      }
    }, 200); // Интервал анимации
  }

  moveSymbolsUp() {
    // Перемещаем символы вверх
    for (let i = 0; i < this.reels.length; i++) {
      // Сохраняем нижний символ
      // const bottomSymbol = this.reels[i][2];
      // Сдвигаем все символы на одну позицию вверх
      for (let j = 2; j > 0; j--) {
        this.reels[i][j] = this.reels[i][j - 1];
      }
      // Генерируем случайный символ для нижней позиции
      this.reels[i][0] = this.generateRandomSymbol();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const numReels = 5; // Количество барабанов
    const symbolWidth = this.canvas.width / numReels; // Ширина символа на барабане
    const symbolHeight = this.canvas.height / 3; // Высота символа на барабане
    const spacing = 1; // Отступ между барабанами

    for (let i = 0; i < numReels; i++) {
      const reel = this.reels[i];
      for (let j = 0; j < reel.length; j++) {
        const symbol = reel[j];
        const img = this.symbolImages[symbol];
        // Отрисовываем символы с учетом отступа между барабанами
        this.ctx.drawImage(img, i * symbolWidth + spacing * i, j * symbolHeight, symbolWidth, symbolHeight);
      }
    }
  }

  // Метод для генерации случайного символа
  generateRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Метод для заполнения барабанов случайными символами
  populateReels() {
    for (let i = 0; i < this.reels.length; i++) {
      for (let j = 0; j < 3; j++) {
        this.reels[i][j] = this.generateRandomSymbol();
      }
    }
  }

  // Метод для перетасовки символов на барабанах
  shuffleReels() {
    for (let i = 0; i < this.reels.length; i++) {
      for (let j = 0; j < 3; j++) {
        this.reels[i][j] = this.generateRandomSymbol();
      }
    }
  }
}
