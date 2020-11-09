const gridParent = document.querySelector("#gridParent");
const reset = document.getElementById("reset");
const mono = document.getElementById("mono");
const greyScale = document.getElementById("greyScale");
const rainbow = document.getElementById("rainbow");

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
    string = e.style.backgroundColor.toString();
    if (!(string.includes("rgb"))) return;
    if (string.lastIndexOf("0") === 17 && !(string.lastIndexOf(".") === 18)) {
    let index = string.lastIndexOf("0");
        let num = string.slice("17", "18");
        num = parseInt(num);
        num += 0.1;
        e.style.backgroundColor = `rgba(10,11,11, ${num})`;
        string = e.style.backgroundColor.toString();
    } else if (string.lastIndexOf(".") === 18) {
        let decNum = string.slice("17", "20");
        decNum = parseFloat(decNum);
        decNum += 0.1;
        e.style.backgroundColor = `rgba(10,11,11, ${decNum})`;
        string = e.style.backgroundColor.toString();
    }
});
};

window.onload = createGrid(16);

const divs = document.querySelectorAll("div");
divs.forEach((div) => {
    fiftyShadesOfGrey(div);
});

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
        const divs = document.querySelectorAll("div");
        divs.forEach((div) => {
            fiftyShadesOfGrey(div);
});
    });
};
reset.addEventListener("click", resetGrid());

function colorRainbow(e) {
    e.addEventListener("mouseover", () => {
    string = e.style.backgroundColor.toString();
    if (!(string.includes("rgb"))) return;
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    console.log(r, g, b);
    // let newColor = `rgb(${r},${g},${b})`;
    e.style.backgroundColor = `rgb(${r},${g},${b})`;
    });
}

function colorMono(e) {
    e.addEventListener("mouseover", () => {
        string = e.style.backgroundColor.toString();
        if (!(string.includes("rgb"))) return;
        e.style.backgroundColor = "rgba(10,11,11, 0.5)";
        

});
};

mono.addEventListener("click", colorMono());
