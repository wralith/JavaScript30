// debounce function to limit our function to run on max each 20ms
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

const checkSlide = (e) => {
  sliderImages.forEach((sliderImage) => {
    // Half of the image
    const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
    // Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // Return boolean is half is on screen
    const isHalf = slideInAt > sliderImage.offsetTop
    // Return boolean is image still on screen
    const isNotScrolledPast = window.scrollY < imageBottom;
    
    (isHalf && isNotScrolledPast) ? sliderImage.classList.add('active') : sliderImage.classList.remove('active')
  });
};

window.addEventListener("scroll", debounce(checkSlide));