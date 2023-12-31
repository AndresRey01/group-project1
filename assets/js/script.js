let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const timestamp = "1696296053511"
const apiKey = "4f8605997b56aaa26b6a6841d247a894"
const hashValue = "f8c1d9d4323bdd3e48f6f09a3c88c7c9"

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);
window.onload = () => {
  getRsult();
};
// Function to save searches to local storage

function saveSearchToLocalStorage(searchTerm) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(searchTerm);
  localStorage.setItem("searches", JSON.stringify(searches));
}
// Function to retrieve and display previous searches from local storage

function displayPreviousSearches() {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.forEach((search) => {
  // Create and append a list item for each search term
    let li = document.createElement("li");
    li.textContent = search;
    listContainer.appendChild(li);
  });
}

displayPreviousSearches();

button.addEventListener("click", async () => {

  saveSearchToLocalStorage(input.value.trim());
});

/* fetching time from users ip address and displaying on html */

function updateClock() {
  fetch("https://worldtimeapi.org/api/ip")
    .then(response => response.json())
    .then((apidata) => {
      const currentTime = new Date(apidata.datetime).toLocaleString();
      let clock = document.getElementById('time-container');
      clock.innerText = currentTime;
    });
}

// Call updateClock initially to set the clock when the page loads
updateClock();

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);
