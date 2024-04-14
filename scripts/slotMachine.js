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
    this.reels = [[], [], []];
    this.isSpinning = false;
    // Загружаем изображения символов
    this.symbolImages = symbolImages;
    // Вызываем метод для настройки размера канваса
    this.adjustCanvasSize();
  }

  // Метод для подстройки размеров канваса под размеры окна
  adjustCanvasSize() {
    const windowHeight = window.innerHeight;
    const heightMultiplier = windowHeight > 1000 ? 0.48 : 0.49; //* + perfect
    const marginTopMultiplier =
      {
        [900 >= windowHeight && windowHeight < 1000]: 120,
        [800 >= windowHeight && windowHeight < 900]: 110,
        [700 >= windowHeight && windowHeight < 800]: 100,
        [windowHeight < 600]: 95,
      }[true] || 130; //* + perfect
    this.canvas.height = windowHeight * heightMultiplier;
    this.canvas.style.marginTop = `${marginTopMultiplier}px`;

    const windowMultiplier = 0.84; //* + perfect
    this.canvas.width = windowHeight * windowMultiplier;
  }

  // Метод для запуска вращения барабанов
  spin() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.animate();
    }
  }

  // Метод для анимации вращения барабанов
  animate() {
    const spinDuration = 3000; // Продолжительность вращения в миллисекундах
    const startTime = Date.now();
    const spinInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        this.isSpinning = false;
        this.populateReels();
        this.draw();
      } else {
        this.shuffleReels();
        this.draw();
      }
    }, 100); // Интервал анимации
  }

  // Метод для отрисовки барабанов на канвасе
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      for (let j = 0; j < reel.length; j++) {
        const symbol = reel[j];
        const img = this.symbolImages[symbol];
        // Пример: отрисовываем изображения символов в определенном месте на канвасе
        this.ctx.drawImage(img, 50 + i * 100, 50 + j * 50, 50, 50);
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
