const gridParent = document.querySelector("#gridParent");
const reset = document.getElementById("reset");
const mono = document.getElementById("mono");
const greyScale = document.getElementById("greyScale");
const rainbow = document.getElementById("rainbow");

let monoSwitch = false;
let greyScaleSwitch = false;
let rainbowSwitch = false;


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
    
    
    e.addEventListener("mouseover", () => {
    let string;
    if (greyScaleSwitch === false) return;
    string = e.style.backgroundColor;
    if (!(string.includes("rgb"))) return;
    let decNum = string.slice("17", "20");
    let numCheck = string.slice("0, 20");
    console.log(numCheck);
    console.log(decNum);
    decNum = parseFloat(decNum);
    if (decNum >= 0.9) return;
    decNum += 0.1;  
    e.style.backgroundColor = `rgba(10,11,11, ${decNum})`;
                
    if (!(string.includes("a"))) {
        string = "rgba(10,11,11, 0.1";
        e.style.background = string;
        string = e.style.backgroundColor;
        } 

    });
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
    e.addEventListener("mouseover", () => {
        if (rainbowSwitch === false) return;
        string = e.style.backgroundColor;   
        if (!(string.includes("rgb"))) return;
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.style.backgroundColor = `rgb(${r},${g},${b})`;
    });
};
function colorMono(e) {
    e.addEventListener("mouseover", () => {
        if (monoSwitch === false) return;
        string = e.style.backgroundColor;
        if (!(string.includes("rgb"))) return;
        e.style.backgroundColor = "rgb(129,144,148)";
    });
};
greyScale.addEventListener("click", () => {
    if (greyScaleSwitch === false) {
    greyScaleSwitch = true;
    console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
    monoSwitch = false;
    console.log(`monoSwitch: ${monoSwitch}`);
    rainbowSwitch = false;
    console.log(`rainbowSwitch: ${rainbowSwitch}`);
    mono.classList.remove("selected");
    rainbow.classList.remove("selected");
    greyScale.classList.add("selected");
    startDraw();
    }
});

mono.addEventListener("click", () => {
    if (monoSwitch === false) {
    monoSwitch = true;
    console.log(`monoSwitch: ${monoSwitch}`);
    greyScaleSwitch = false
    console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
    rainbowSwitch = false;
    console.log(`rainbowSwitch: ${rainbowSwitch}`);
    greyScale.classList.remove("selected");
    rainbow.classList.remove("selected");
    mono.classList.add("selected");
    startDraw();
    }
});

rainbow.addEventListener("click", () => {
    if (rainbowSwitch === false) {
        rainbowSwitch = true;
        console.log(`rainbowSwitch: ${rainbowSwitch}`);
        greyScaleSwitch = false;
        console.log(`greyScaleSwitch: ${greyScaleSwitch}`);
        monoSwitch = false;
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
    if (greyScaleSwitch === true) {
        fiftyShadesOfGrey(div);
    } else if (monoSwitch === true) {
        colorMono(div);
    } else if (rainbowSwitch === true) {
        colorRainbow(div);
    }
});
};

startDraw();