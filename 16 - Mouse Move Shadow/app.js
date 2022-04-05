const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
// How much stretch
const walk = 50; //px

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(50, 180, 0, 0.4),
  ${xWalk * -1}px ${yWalk}px 0 rgba(180, 0, 180, 0.4),
  ${xWalk}px ${yWalk * -1}px 0 rgba(180, 0, 0, 0.4)`;

}

hero.addEventListener("mousemove", shadow);
