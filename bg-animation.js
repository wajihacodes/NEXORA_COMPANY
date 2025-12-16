const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
let width, height;

// Wave Animation Constants
const waves = [];
const config = {
  waveCount: 3,
  startColor: { r: 147, g: 51, b: 234 }, // Purple
  speed: 0.005,
  amplitude: 50,
  frequency: 0.01,
};

// Resize Handling
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initWaves();
}

// Wave Class
class Wave {
  constructor(y, amplitude, length, speed, hueOpacity) {
    this.y = y;
    this.amplitude = amplitude;
    this.length = length;
    this.speed = speed;
    this.hueOpacity = hueOpacity;
    this.phase = Math.random() * Math.PI * 2;
  }

  update() {
    this.phase += this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(147, 51, 234, ${this.hueOpacity})`;
    ctx.lineWidth = 1.5;

    for (let x = 0; x < width; x++) {
      // Sine wave formula: y = A * sin(kx + wt)
      // k = 2PI / wavelength
      const dx = x * ((Math.PI * 2) / this.length);
      const dy = Math.sin(dx + this.phase) * this.amplitude;
      ctx.lineTo(x, this.y + dy);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

// Initialize Waves
function initWaves() {
  waves.length = 0; // Clear existing
  const centerY = height / 2;

  // Create multiple overlapping waves
  // Wave 1: Slow, large
  waves.push(new Wave(centerY, 100, width * 0.8, 0.01, 0.1));
  // Wave 2: Faster, medium
  waves.push(new Wave(centerY, 60, width * 0.6, 0.015, 0.15));
  // Wave 3: Varied
  waves.push(new Wave(centerY, 80, width * 0.4, 0.008, 0.12));
  // Wave 4: Offset
  waves.push(new Wave(centerY + 50, 40, width * 0.5, -0.01, 0.08));
  // Wave 5: Offset
  waves.push(new Wave(centerY - 50, 50, width * 0.7, -0.012, 0.08));
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);

  waves.forEach((wave) => {
    wave.update();
    wave.draw(ctx);
  });
}

// Event Listeners
window.addEventListener('resize', resize);

// Start
resize();
animate();
