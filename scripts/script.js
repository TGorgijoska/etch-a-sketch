const container = document.querySelector('.container');
const clearBtn = document.querySelector('.btn-clear');
const buttons = document.querySelectorAll('.btn');

const containerStyles = window.getComputedStyle(container);
let conatinerDimensitions = (containerStyles.width).slice(0,-2);
let squareColor, color, dimension, squareSum;

createGrid(16);
function calcSqaresDimension(squares){
    return (conatinerDimensitions / squares) + 'px';
}
// ========= GRID CREATION
function createGrid (squares){
    container.innerHTML = "";  
    dimension = calcSqaresDimension(squares);
    squaresSum = squares*squares;

    for(let i=0 ; i < squaresSum ; i++){
        let gridEl = document.createElement('div');
        gridEl.setAttribute('class', 'grid');      
        gridEl.setAttribute('style', `width:${dimension}; height:${dimension}`);
        container.appendChild(gridEl);
    }
    gridColorEvent();
}
function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
function gridColorEvent (shades){
    const grid = document.querySelectorAll('.grid');
    grid.forEach(gridEl => gridEl.addEventListener('mouseover', () => {
        if(shades == 'random'){
            color = random_rgba();
            gridEl.setAttribute('style', `width:${dimension}; height:${dimension};background-color: ${color}`);
        }
        else if(shades == 'shades'){
            
        } 
        else {
            gridEl.classList.add('color');
        }
    }))
}

// ========= EVENT LISTENERS

clearBtn.addEventListener('click', () => {   
    let squares = prompt("Enter a number of squares (max 100)", '16');
    if(squares > 100){
        squares = prompt("You can make max of 100x100. Enter a new number", '16');
    }
    if(squares > 0){
        createGrid(squares);
    }
    
})

buttons.forEach(btn => btn.addEventListener('click', ()=>{
    switch (btn.dataset.color){
        case 'random': 
            gridColorEvent('random');
            break;
        case 'shades':
            gridColorEvent('shades');
            break;
    }
   
}))