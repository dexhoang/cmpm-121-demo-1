import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Carrot Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create button
const button = document.createElement('button');
button.textContent = '🥕';
document.body.appendChild(button);

//checks if button was clicked
if (button) {
    button.addEventListener("click", () => {
        console.log("Button was clicked!");
    })
}
