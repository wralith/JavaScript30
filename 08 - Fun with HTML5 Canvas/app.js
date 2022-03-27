const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "#E3BA7e";
context.lineJoin = "round";
context.lineCap = "square";
context.lineWidth = "50";
context.globalCompositeOperation = 'overlay'

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = (e) => {
  if (!isDrawing) return;
  context.strokeStyle = `hsla(${hue}, 100%, 50%, 0.5)`;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (context.lineWidth > 90 || context.lineWidth <= 1) {
    direction = !direction;
  }
  direction ? context.lineWidth++ : context.lineWidth--
};

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];
  isDrawing = true;
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
