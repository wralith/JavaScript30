const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  // Check
  if (e.shiftKey && this.checked) {
    console.log("Checking");
    let inBetween = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {checkbox.checked =  true}
    });
  }
  // Uncheck
  if (e.shiftKey && !this.checked) { // Non-Checked
    console.log("UnChecking"); 
    let inBetween = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {checkbox.checked =  false} // False
    });
  }

  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
