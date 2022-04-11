const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);

      //Did not worked. Deprecated
      // video.src = window.URL.createObjectURL(localMediaStream);

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      "Webcam Access Error!", err;
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    // RED
    // pixels = redEffect(pixels);

    // WOAH, Hazy rgbSplit
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;

    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 20);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const photoData = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = photoData;
  link.setAttribute("download", "pic");
  link.innerHTML = `<img src="${photoData}" alt="Photo" />`;
  // link.textContent = "Download Image"; // Shows text 'instead
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i + 0] + 100; // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // Red
    pixels.data[i + 100] = pixels.data[i + 1]; // Green
    pixels.data[i - 150] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });


  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 100;
      pixels.data[i + 1] = 20;
      pixels.data[i + 2] = pixels.data[i + 2] * 2; 
    }
  }

  // Todo Add another slider to change colors

  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
