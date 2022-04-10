const timeNodes = [...document.querySelectorAll("[data-time]")];

// Sec Eq
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondLeft = seconds;
const hours = Math.floor(secondLeft / 3600);
secondLeft = secondLeft % 3600; // How Many Left
const mins = Math.floor(secondLeft / 60);
secondLeft = secondLeft % 60;

console.log(hours, mins, secondLeft);