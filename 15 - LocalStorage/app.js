const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
// Load from Local Storage if exist
let items = JSON.parse(localStorage.getItem("items")) || [];
const clearButton = document.getElementById("clear");
const checkAllButton = document.getElementById("check-all");
const uncheckAllButton = document.getElementById("uncheck-all");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  // Save To Local Storage
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(goods = [], goodsList) {
  goodsList.innerHTML = goods
    .map((good, i) => {
      return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        good.done ? "checked" : ""
      }/>
          <label for="item${i}">${good.text}</label>
        </li>
      `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function clearItemList() {
  items = [];
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

function checkAll() {
  items.forEach((item) => (item.done = true));
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));

}

function uncheckAll() {
  items.forEach((item) => (item.done = false));
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

addItems.addEventListener("submit", addItem);
clearButton.addEventListener("click", clearItemList);
checkAllButton.addEventListener("click", checkAll);
uncheckAllButton.addEventListener("click", uncheckAll);
// Listener on unordered list
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);
