const dogs = [
  { name: "Snickers", age: 2 },
  { name: "hugo", age: 8 },
];

function makeGreen() {
  const p = document.querySelector("p");
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

// Regular
console.log("Wralith");

// Interpolated
console.log("Hello %s is an emjoi", "🎈");

// Styled
console.log("%cSomething something", "color: red");

// warning!
console.warn("This is a mistake");

// Error :|
console.error("This is more than a mistake");

// Info
console.info("This app is to learn basics of JS");

// Testing
// If first statement is false second will be shown in console
const p = document.querySelector("p");
// p exist therefore truthy in this case, so nothing will happen
console.assert(p, "Nooo! There is no paragraph.");
// opposite of first example.
console.assert(!p, "Nooo! There is a paragraph.");

// clearing
// Self explanatory
// console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p);

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(dog.name);
  console.log(`Age: ${dog.age}`);
  console.log(`Dog age: ${dog.age * 7}`);
  console.groupEnd(dog.name);
});

// counting
console.count('x');
console.count('y');
console.count('y');
console.count('x');
console.count('y');
console.count('y');
console.count('x');
console.count('y');

// timing
console.time('Fetching Data')
fetch('https://api.github.com/users/wralith')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('Fetching Data')
    console.log(data)
  })

console.table(dogs)