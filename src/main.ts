/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Carrot Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create button - STEP 1
const clicker = document.createElement("button");
clicker.textContent = "🥕";
clicker.style.fontSize = "50px";
app.appendChild(clicker);

//displays amount of times button was clicked - STEP 2
let carrotCount = 0;

const display = document.createElement("div");
display.id = "counter";
display.textContent = `Carrots: ${carrotCount}`;
app.appendChild(display);

clicker.addEventListener("click", () => {
  carrotCount++;
  display.textContent = `Carrots: ${carrotCount}`;
  if (carrotCount >= 10) {
    A_Growth.disabled = false;
  } else {
    A_Growth.disabled = true;
  }
  if (carrotCount >= 100) {
    B_Growth.disabled = false;
  } else {
    B_Growth.disabled = true;
  }
  if (carrotCount >= 1000) {
    C_Growth.disabled = false;
  } else {
    C_Growth.disabled = true;
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
    A_Growth.disabled = false;
  } else {
    A_Growth.disabled = true;
  }
  if (carrotCount >= 100) {
    B_Growth.disabled = false;
  } else {
    B_Growth.disabled = true;
  }
  if (carrotCount >= 1000) {
    C_Growth.disabled = false;
  } else {
    C_Growth.disabled = true;
  }
  lastTime = timestamp;
  requestAnimationFrame(updateCounter);
}

//adds buyable button to increase growth rate - STEP 5
//adds multiple upgrades/status - STEP 6

//growth rate status
let growthRateValue = 0;
const totalGrowth = document.createElement("div");
totalGrowth.id = "totalGrowth";
totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
app.appendChild(totalGrowth);

//num of upgrades status
let A_Total = 0;
const A_Num = document.createElement("div");
A_Num.id = "A_Num";
A_Num.textContent = `Purchased A ${A_Total} times`;
app.appendChild(A_Num);

let B_Total = 0;
const B_Num = document.createElement("div");
B_Num.id = "B_Num";
B_Num.textContent = `Purchased B ${B_Total} times`;
app.appendChild(B_Num);

let C_Total = 0;
const C_Num = document.createElement("div");
C_Num.id = "C_Num";
C_Num.textContent = `Purchased C ${C_Total} times`;
app.appendChild(C_Num);

//A Upgrade
const A_Growth = document.createElement("button");
A_Growth.id = "A_Growth";
A_Growth.textContent = "Upgrade Growth Rate (10) - A";
app.appendChild(A_Growth);
A_Growth.disabled = true;

A_Growth.addEventListener("click", () => {
  carrotCount -= 10;
  growthRateValue += 0.1;
  A_Total += 1;
  display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
  totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
  A_Num.textContent = `Purchased A ${A_Total} times`;
  requestAnimationFrame(updateCounter);

  if (carrotCount >= 10) {
    A_Growth.disabled = false;
  } else {
    A_Growth.disabled = true;
  }
});

//B Upgrade
const B_Growth = document.createElement("button");
B_Growth.id = "B_Growth";
B_Growth.textContent = "Upgrade Growth Rate (100) - B";
app.appendChild(B_Growth);
B_Growth.disabled = true;

B_Growth.addEventListener("click", () => {
  carrotCount -= 100;
  growthRateValue += 2;
  B_Total += 1;
  display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
  totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
  B_Num.textContent = `Purchased B ${B_Total} times`;
  requestAnimationFrame(updateCounter);

  if (carrotCount >= 100) {
    B_Growth.disabled = false;
  } else {
    B_Growth.disabled = true;
  }
});

//C Upgrade
const C_Growth = document.createElement("button");
C_Growth.id = "C_Growth";
C_Growth.textContent = "Upgrade Growth Rate (1000) - C";
app.appendChild(C_Growth);
C_Growth.disabled = true;

C_Growth.addEventListener("click", () => {
  carrotCount -= 1000;
  growthRateValue += 50;
  C_Total += 1;
  display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
  totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
  C_Num.textContent = `Purchased C ${C_Total} times`;
  requestAnimationFrame(updateCounter);

  if (carrotCount >= 1000) {
    C_Growth.disabled = false;
  } else {
    C_Growth.disabled = true;
  }
});
