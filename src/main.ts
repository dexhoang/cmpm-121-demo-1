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
  if (carrotCount >= 10) {
    growthRate.disabled = false;
  } else {
    growthRate.disabled = true;
  }
});

//increments counter by 1 every second - STEP 3
// const interval = setInterval(addCounter, 1000);
// function addCounter() {
//   carrotCount++;
//   display.textContent = `Carrots: ${carrotCount}`;
// }
// console.log(interval);

//makes counter grow by fractional amount per animation frame - STEP 4
let lastTime: number | null = null;

function updateCounter(timestamp: number) {
  if (lastTime !== null) {
    const deltaTime = (timestamp - lastTime) / 1000;
    carrotCount += deltaTime * growthRateValue;
    display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
  }
  if (carrotCount >= 10) {
    growthRate.disabled = false;
  } else {
    growthRate.disabled = true;
  }
  lastTime = timestamp;
  requestAnimationFrame(updateCounter);
}

//adds buyable button to increase growth rate - STEP 5
const growthRate = document.createElement("button");
growthRate.id = "growthRate";
growthRate.textContent = "Upgrade Growth Rate (10) +1";
app.appendChild(growthRate);
growthRate.disabled = true;

let growthRateValue = 0;

growthRate.addEventListener("click", () => {
    console.log("purchased");
    carrotCount -= 10;
    growthRateValue += 1;
    display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
    requestAnimationFrame(updateCounter);

    if (carrotCount >= 10) {
        growthRate.disabled = false;
      } else {
        growthRate.disabled = true;
      }
});
