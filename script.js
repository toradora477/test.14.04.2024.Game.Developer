const symbols = [];
for (let i = 0; i <= 12; i++) {
  symbols.push(`M${i < 10 ? '0' : ''}${i}_000`);
}

const symbolImages = {};

// Load symbol images
let imagesLoaded = 0;
const totalImages = symbols.length;
const checkImagesLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log('All images loaded');
    const slotMachine = new SlotMachine('slotCanvas');
  }
};

for (const symbol of symbols) {
  const img = new Image();
  img.onload = checkImagesLoaded;
  img.src = `images/${symbol}.jpg`;
  symbolImages[symbol] = img;
}

class SlotMachine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.spinButton = document.getElementById('spinButton');
    this.spinButton.addEventListener('click', () => this.spin());
    this.reels = [[], [], []];
    this.isSpinning = false;

    // Use loaded symbol images
    this.symbolImages = symbolImages;
  }

  spin() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.populateReels();
      this.animate();
    }
  }

  animate() {
    const spinDuration = 3000; // milliseconds
    const startTime = Date.now();
    const spinInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        this.isSpinning = false;
      }
      this.draw();
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      for (let j = 0; j < reel.length; j++) {
        const symbol = reel[j];
        const img = this.symbolImages[symbol];
        this.ctx.drawImage(img, 50 + i * 100, 50 + j * 50, 50, 50);
      }
    }
  }

  generateRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  populateReels() {
    for (let i = 0; i < this.reels.length; i++) {
      for (let j = 0; j < 3; j++) {
        this.reels[i][j] = this.generateRandomSymbol();
      }
    }
  }
}
