const container = document.querySelector('.container');
const clearBtn = document.querySelector('.btn-clear');
const randomBtn = document.querySelector('.btn-random');
const eraserBtn = document.querySelector('.btn-eraser');

const containerStyles = window.getComputedStyle(container);
let conatinerDimensitions = (containerStyles.width).slice(0,-2);
let squareColor, color, dimension, squaresSum, currentColor = "color";

clearBtn.onclick = () => askUser();
randomBtn.onclick = () => updateColor('random');
eraserBtn.onclick = () => updateColor('eraser');
createGrid(16);

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
        e.target.style.backgroundColor = "#fdffc4";
    } else if (currentColor == 'random'){
        color = random_rgba();
        e.target.style.backgroundColor = color;
    } else if (currentColor == 'shades'){
        // e.target.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`
    } else if(currentColor == 'eraser'){
        e.target.style.backgroundColor = "#abd1ff";
    }

}

function updateColor(color){
    currentColor = color;
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