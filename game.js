const gridParent = document.querySelector("#gridParent");
const reset = document.getElementById("reset");
const mono = document.getElementById("mono");
const greyScale = document.getElementById("greyScale");
const rainbow = document.getElementById("rainbow");

let monoSwitch = "off";
let greyScaleSwitch = "on";
let rainbowSwitch = "off";


function createGrid(n, r) {
    gridParent.style.cssText = `grid-template-rows: repeat(${n}, minmax(0, ${100 / n}%)); 
    grid-template-columns: repeat(${n}, minmax(0, ${100 / n}));`;
    for (i = 1; i <= n; i++) {
        repeatCells(n, i);
    }
};  

function repeatCells(n) {
    for (j = 1; j <= n; j++) {
        let cell = document.createElement("div");
        cell.style.cssText = `grid-column: ${j}; grid-row: auto; background-color: rgba(10,11,11, 0);`;
        cell.classList.add("gridChildren");
        gridParent.appendChild(cell);
    }
};

function fiftyShadesOfGrey(e) {
    if (greyScaleSwitch ==="off") return;
    else if (greyScaleSwitch === "on") {
        e.addEventListener("mouseover", () => {
        let string;
        string = e.style.backgroundColor;
        
        if (!(string.includes("rgb"))) return;

            let decNum = string.slice("17", "20");
            decNum = parseFloat(decNum);
            decNum += 0.1;
            e.style.backgroundColor = `rgba(10,11,11, ${decNum})`;
            string = e.style.backgroundColor;
        if (!(string.includes("a"))) {
            string = "rgba(10,11,11, 0.1";
            e.style.background = string;
            string = e.style.backgroundColor;
            } 

        });
    };
};
window.onload = createGrid(16);

function resetGrid(e) {
    reset.addEventListener("click", () => {
        let gridSize;
        do {
            gridSize = prompt("Please enter a value between 1 and 100:");
            if (gridSize === null) return;
        } while (parseInt(gridSize) < 1 || parseInt(gridSize) > 100 || isNaN(gridSize) === true);
        while (gridParent.firstChild) {
            gridParent.removeChild(gridParent.lastChild);
        }
        createGrid(gridSize);
        startDraw();
    });
};
reset.addEventListener("click", resetGrid());

function colorRainbow(e) {
    if (rainbowSwitch === "off") return;
    else if (rainbowSwitch === "on") {
        e.addEventListener("mouseover", () => {
            string = e.style.backgroundColor;
            if (!(string.includes("rgb"))) return;
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            e.style.backgroundColor = `rgb(${r},${g},${b})`;
        });
    };
};
function colorMono(e) {
    if (monoSwitch === "off") return;
    else if (monoSwitch === "on") {
        e.addEventListener("mouseover", () => {
            string = e.style.backgroundColor;
            if (!(string.includes("rgb"))) return;
            e.style.backgroundColor = "rgb(129,144,148)";
        });
    };
};
greyScale.addEventListener("click", () => {
    if (greyScaleSwitch === "off") {
    greyScaleSwitch = "on";
    console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
    monoSwitch = "off";
    console.log(`monoSwitch: ${monoSwitch}`);
    rainbowSwitch = "off";
    console.log(`rainbowSwitch: ${rainbowSwitch}`);
    mono.classList.remove("selected");
    rainbow.classList.remove("selected");
    greyScale.classList.add("selected");
    startDraw();
    }
});

mono.addEventListener("click", () => {
    if (monoSwitch === "off") {
    monoSwitch = "on";
    console.log(`monoSwitch: ${monoSwitch}`);
    greyScaleSwitch = "off"
    console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
    rainbowSwitch = "off";
    console.log(`rainbowSwitch: ${rainbowSwitch}`);
    greyScale.classList.remove("selected");
    rainbow.classList.remove("selected");
    mono.classList.add("selected");
    startDraw();
    }
});

rainbow.addEventListener("click", () => {
    if (rainbowSwitch === "off") {
        rainbowSwitch = "on";
        console.log(`rainbowSwitch: ${rainbowSwitch}`);
        greyScaleSwitch = "off";
        console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
        monoSwitch = "off";
        console.log(`monoSwitch: ${monoSwitch}`);
        greyScale.classList.remove("selected");
        mono.classList.remove("selected");
        rainbow.classList.add("selected");
        startDraw();
    }
});

function startDraw() {
const divs = document.querySelectorAll("div");
divs.forEach((div)  => {
    if (greyScaleSwitch === "on") {
        fiftyShadesOfGrey(div);
    } else if (monoSwitch === "on") {
        colorMono(div);
    } else if (rainbowSwitch === "on") {
        colorRainbow(div);
    }
});
};

startDraw();