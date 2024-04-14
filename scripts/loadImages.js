// Массив символов для загрузки изображений
const symbols = [];
for (let i = 0; i <= 12; i++) {
  symbols.push(`M${i < 10 ? '0' : ''}${i}_000`);
}

// Объект для хранения загруженных изображений
const symbolImages = {};

// Счетчик загруженных изображений и общее количество изображений
let imagesLoaded = 0;
const totalImages = symbols.length;

// Функция для проверки загрузки всех изображений
const checkImagesLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log('All images loaded');
    // Создание экземпляра игрового автомата и начальная настройка
    const slotMachine = new SlotMachine('slotCanvas');
    slotMachine.adjustCanvasSize();
    slotMachine.populateReels();
    slotMachine.draw();
  }
};

// Загрузка изображений
for (const symbol of symbols) {
  const img = new Image();
  img.onload = checkImagesLoaded;
  img.src = `images/${symbol}.jpg`;
  symbolImages[symbol] = img;
}
