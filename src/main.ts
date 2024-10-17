/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

document.body.style.backgroundColor = "#fffff";

const gameName = "Carrot Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.color = "#ff7100";
app.append(header);

const description_instruction = document.createElement("div");
description_instruction.textContent = "Hover Over Item To Show Description";
description_instruction.style.fontSize = "20px";

//create button - STEP 1
const clicker = document.createElement("button");
clicker.textContent = "🥕";
clicker.style.fontSize = "50px";
clicker.style.marginBottom = "20px";
app.appendChild(clicker);

//displays amount of times button was clicked - STEP 2
let carrotCount = 0;

const display = document.createElement("div");
display.id = "counter";
display.textContent = `Carrots: ${carrotCount}`;
display.style.fontFamily = "inherit";
display.style.fontWeight = "bold";
display.style.fontSize = "35px";
display.style.marginBottom = "10px";
display.style.color = "#fbbb89";
app.appendChild(display);

clicker.addEventListener("click", () => {
  carrotCount++;
  display.textContent = `Carrots: ${carrotCount}`;
  updateButtons();
});

//makes counter grow by fractional amount per animation frame - STEP 4
let lastTime: number | null = null;

function updateCounter(timestamp: number) {
  if (lastTime !== null) {
    const deltaTime = (timestamp - lastTime) / 1000;
    carrotCount += deltaTime * growthRateValue;
    display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
  }
  lastTime = timestamp;
  updateButtons();
  requestAnimationFrame(updateCounter);
}

//adds buyable button to increase growth rate - STEP 5
//adds multiple upgrades/status - STEP 6

//growth rate status
let growthRateValue = 0;
const totalGrowth = document.createElement("div");
totalGrowth.id = "totalGrowth";
totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
totalGrowth.style.marginBottom = "20px";
totalGrowth.style.fontSize = "18px";
app.appendChild(totalGrowth);

//data driven design - STEP 9
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchases: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Baby Carrot 🥕",
    cost: 10,
    rate: 0.1,
    purchases: 0,
    description: "Cheerish yourself to very very small carrots",
  },
  {
    name: "Carrot Basket 🧺",
    cost: 100,
    rate: 2,
    purchases: 0,
    description: "A nice picnic basket full of carrots",
  },
  {
    name: "Carrot Crate 📦",
    cost: 1000,
    rate: 50,
    purchases: 0,
    description: "A big ol' box of carrots",
  },
  {
    name: "Bunny 🐇",
    cost: 2000,
    rate: 75,
    purchases: 0,
    description: "Buy a bunny to sniff out carrots",
  },
  {
    name: "Carrot Farmer 🧑‍🌾",
    cost: 4000,
    rate: 100,
    purchases: 0,
    description: "Hire a farmer to harvest the freshest carrots",
  },
];

availableItems.forEach((item) => {
  const button = document.createElement("button");
  button.textContent = `Buy ${item.name} (${item.cost})`;
  button.style.marginRight = "5px";
  button.style.marginBottom = "20px";
  button.title = `${item.description}`;
  app.appendChild(button);

  const purchase = document.createElement("div");
  purchase.textContent = `Purchased ${item.purchases} time(s)`;
  purchase.style.marginBottom = "10px";
  purchase.style.fontSize = "12px";
  app.appendChild(purchase);

  button.disabled = true;

  button.addEventListener("click", () => {
    if (carrotCount >= item.cost) {
      carrotCount -= item.cost;
      growthRateValue += item.rate;
      display.textContent = `Carrots: ${Math.floor(carrotCount)}`;
      totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;

      item.cost *= 1.15;
      item.purchases += 1;
      button.textContent = `Buy ${item.name} (${Math.round(item.cost * 100) / 100})`;
      purchase.textContent = `Purchased ${item.purchases} time(s)`;
    }

    button.disabled = carrotCount < item.cost;
    updateButtons();
  });

  app.appendChild(button);
});

function updateButtons() {
  availableItems.forEach((item) => {
    const button = Array.from(app.querySelectorAll("button")).find((btn) =>
      btn.textContent?.startsWith(`Buy ${item.name}`),
    ) as HTMLButtonElement;

    if (button) {
      button.disabled = carrotCount < item.cost;
    }
  });
}

app.appendChild(description_instruction);

requestAnimationFrame(updateCounter);
