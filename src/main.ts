/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Carrot Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create button - STEP 1
const button = document.createElement("button");
button.textContent = "🥕";
app.appendChild(button);

//checks if button was clicked
if (button) {
  button.addEventListener("click", () => {
    console.log("Button was clicked!");
  });
}

//displays amount of times button was clicked - STEP 2
let carrotCount = 0;

const display = document.createElement("div");
display.id = "counter";
display.textContent = `Carrots: ${carrotCount}`;
app.appendChild(display);

button.addEventListener("click", () => {
  carrotCount++;
  display.textContent = `Carrots: ${carrotCount}`;
});

//increments counter by 1 every second - STEP 3
const interval = setInterval(addCounter, 1000);
function addCounter() {
  carrotCount++;
  display.textContent = `Carrots: ${carrotCount}`;
}
console.log(interval);
