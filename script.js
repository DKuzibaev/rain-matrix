const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(canvas.width, canvas.height, 0, 0);
gradient.addColorStop(0, "rgb(25, 0, 255)");
gradient.addColorStop(0.3, "rgb(0, 81, 255)");
gradient.addColorStop(0.6, "rgb(47, 0, 255)");
gradient.addColorStop(0.8, "rgb(98, 0, 255)");
gradient.addColorStop(1, "rgb(153, 0, 255)");

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.charecters = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソト
    ノホモヨョロヲゴゾドボポヴッン♔♕♖♗♘♙♚♛♜♝♞♟`;
    this.x = x;
    this.y = y;
    this.fonsSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.charecters.charAt(
      Math.floor(Math.random() * this.charecters.length)
    );

    context.fillText(this.text, this.x * this.fonsSize, this.y * this.fonsSize);
    if (this.y * this.fonsSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 50;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient; //"#6b03fc"
    ctx.font = effect.fonsSize + "px monospace";
    effect.symbols.forEach((symbols) => symbols.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = this.window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
