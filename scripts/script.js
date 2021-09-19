const container = document.querySelector('.container');
const clearBtn = document.querySelector('.btn-clear');
const colorBtn = document.querySelector('.btn-color');
const randomBtn = document.querySelector('.btn-random');
const eraserBtn = document.querySelector('.btn-eraser');
const shadesBtn = document.querySelector('.btn-shades');

const containerStyles = window.getComputedStyle(container);
let conatinerDimensitions = (containerStyles.width).slice(0,-2);
let squareColor, color, dimension, squaresSum, currentColor = "color";

const COLOR_YELLOW = "rgba(253, 255, 196, 1)";
const COLOR_BLUE = "rgba(173, 210, 255, 1)";
clearBtn.onclick = () => askUser();
colorBtn.onclick = () => updateColor('color');
randomBtn.onclick = () => updateColor('random');
eraserBtn.onclick = () => updateColor('eraser');
shadesBtn.onclick = () => updateColor('shades');
createGrid(16);
activateButton();

function calcSqaresDimension(squares){
    return (conatinerDimensitions / squares) + 'px';
}

function createGrid (squares){
    container.innerHTML = "";  
    dimension = calcSqaresDimension(squares);
    squaresSum = squares*squares;

    for(let i=0 ; i < squaresSum ; i++){
        let gridEl = document.createElement('div');
        gridEl.setAttribute('class', 'grid');      
        gridEl.setAttribute('style', `width:${dimension}; height:${dimension}`);
        gridEl.addEventListener('mouseover', changeColor);
        container.appendChild(gridEl);
    }
}

function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function changeColor(e){
    if(currentColor == 'color'){
        e.target.style.backgroundColor = COLOR_YELLOW;
    } else if (currentColor == 'random'){
        color = random_rgba();
        e.target.style.backgroundColor = color;
    } else if (currentColor == 'shades'){
        let backgroundStyle = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
        changeOpacity(backgroundStyle, e.target);
    } else if(currentColor == 'eraser'){
        e.target.style.backgroundColor = COLOR_BLUE;
    }

}
function changeOpacity(bgcolor, target){
    let rgbaValues = bgcolor.split(',');
        if(rgbaValues.length == 3){
            target.style.backgroundColor = `${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2].slice(-4,-1)}, 0.1)`;
        } else {
            let currentOpacity = rgbaValues[3].slice(-4,-1);
            target.style.backgroundColor = `${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${+currentOpacity + 0.2} )`;
        }
}
function updateColor(color){
    currentColor = color;
    activateButton();
}
function activateButton(){
    deactivateButtons();
    switch (currentColor){
        case 'color': 
            colorBtn.classList.add('activate');
            break;
        case 'random':
            randomBtn.classList.add('activate');
            break;
        case 'shades':
            shadesBtn.classList.add('activate');
            break;
        case 'eraser':
            eraserBtn.classList.add('activate');
            break;
            
    }
}
function deactivateButtons(){
    colorBtn.classList.remove('activate');
    randomBtn.classList.remove('activate');
    shadesBtn.classList.remove('activate');
    eraserBtn.classList.remove('activate');
}

function askUser(){ 
    let squares = prompt("Enter a number of squares (max 100)", '16');
    while(true){
        if(squares > 100 || squares <=0){
            squares = prompt("Choose a number between 0 and 100.", '16');
        } else break;        
    }
    
    createGrid(squares);
    
    
}