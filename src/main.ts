/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//configuration constants
const INITIAL_COSTS = {
  BABY_CARROT: 10,
  CARROT_BASKET: 100,
  CARROT_CRATE: 1000,
  BUNNY: 2000,
  CARROT_FARMER: 4000,
};

const INITIAL_RATES = {
  BABY_CARROT: 0.1,
  CARROT_BASKET: 2,
  CARROT_CRATE: 50,
  BUNNY: 75,
  CARROT_FARMER: 100,
}

//global variables
let carrotCount = 0;
let growthRateValue = 0;

//interface definitions
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchases: number;
  description: string;
}

//helper functions
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

function createButton(item: Item) {
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
  purchase.style.color = "#ffdfc7";
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

  return button;
}

//UI initialization
const gameName = "Carrot Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.color = "#35944e";
header.style.marginBottom = "20px";
app.append(header);

const description_instruction = document.createElement("div");
description_instruction.textContent = "Hover Over Item To Show Description";
description_instruction.style.fontSize = "20px";
description_instruction.style.marginBottom = "20px";
description_instruction.style.fontWeight = "bold";
description_instruction.style.color = "#ffcca5";
app.appendChild(description_instruction);

const clicker = document.createElement("button");
clicker.textContent = "🥕";
clicker.style.fontSize = "150px";
clicker.style.marginBottom = "15px";
clicker.style.width = "300px"
clicker.style.height = "300px"
clicker.style.padding = "20px";
app.appendChild(clicker);

const display = document.createElement("div");
display.id = "counter";
display.textContent = `Carrots: ${carrotCount}`;
display.style.fontFamily = "inherit";
display.style.fontWeight = "bold";
display.style.fontSize = "35px";
display.style.marginBottom = "10px";
display.style.color = "#ffcca5";
app.appendChild(display);

const totalGrowth = document.createElement("div");
totalGrowth.id = "totalGrowth";
totalGrowth.textContent = `Current Growth Rate: ${Math.round(growthRateValue * 10) / 10} Carrots/sec`;
totalGrowth.style.marginBottom = "20px";
totalGrowth.style.fontSize = "18px";
totalGrowth.style.fontWeight = "bold";
totalGrowth.style.color = "#ffcca5";
app.appendChild(totalGrowth);

//UI Manipulators 
const availableItems: Item[] = [
  {
    name: "Baby Carrot 🥕",
    cost: INITIAL_COSTS.BABY_CARROT,
    rate: INITIAL_RATES.BABY_CARROT,
    purchases: 0,
    description: "Cheerish yourself to very very small carrots",
  },
  {
    name: "Carrot Basket 🧺",
    cost: INITIAL_COSTS.CARROT_BASKET,
    rate: INITIAL_RATES.CARROT_BASKET,
    purchases: 0,
    description: "A nice picnic basket full of carrots",
  },
  {
    name: "Carrot Crate 📦",
    cost: INITIAL_COSTS.CARROT_CRATE,
    rate: INITIAL_RATES.CARROT_CRATE,
    purchases: 0,
    description: "A big ol' box of carrots",
  },
  {
    name: "Bunny 🐇",
    cost: INITIAL_COSTS.BUNNY,
    rate: INITIAL_RATES.BUNNY,
    purchases: 0,
    description: "Buy a bunny to sniff out carrots",
  },
  {
    name: "Carrot Farmer 🧑‍🌾",
    cost: INITIAL_COSTS.CARROT_FARMER,
    rate: INITIAL_RATES.CARROT_FARMER,
    purchases: 0,
    description: "Hire a farmer to harvest the freshest carrots",
  },
];

availableItems.forEach((item) => {
  createButton(item);
});

requestAnimationFrame(updateCounter);

//event handlers
clicker.addEventListener("click", () => {
  carrotCount++;
  display.textContent = `Carrots: ${carrotCount}`;
  updateButtons();
});
