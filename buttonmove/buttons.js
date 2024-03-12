let sum = 0;
let isMoving = false;

const colorSelect = document.getElementById('colorSelect');
const makeButton = document.getElementById('makeButton');
const moveButton = document.getElementById('moveButton');
const viewingArea = document.getElementById('viewingArea');
const total = document.getElementById('total');

function createButton() {
    const color = colorSelect.value;
    const button = document.createElement('button');
    const randomX = Math.random() * (viewingArea.offsetWidth - 50);
    const randomY = Math.random() * (viewingArea.offsetHeight - 50);
    const randomNum = Math.floor(Math.random() * 99) + 1;
    
    button.classList.add('button');
    button.style.backgroundColor = color;
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.innerText = randomNum;
    button.addEventListener('click', () => {
        button.style.backgroundColor = colorSelect.value;
        button.style.color = "white";
        if(button.style.backgroundColor == "white" || button.style.backgroundColor == "yellow") {
            button.style.color = "black";
        }
        updateTotal(randomNum);
    });
    
    if (color === 'white' || color === 'yellow') {
        button.style.color = 'black'; 
    }
    
    viewingArea.appendChild(button);
}

function updateTotal(randomNum) {
    sum += randomNum;
    total.innerText = `Total: ${sum}`;
}

function toggleMove() {
    const buttons = document.getElementsByClassName('button');
    isMoving = !isMoving;
    
    if (isMoving) {
        moveButton.innerText = 'Pause';
        moveButtons(buttons);
    } else {
        moveButton.innerText = 'Move!';
        stop(buttons);
    }
}

function moveButtons(buttons) {
    for (const button of buttons) {
        moveButtonHelper(button);
    }
}

function stop(buttons) {
    for (const button of buttons) {
        clearInterval(button.interval);
    }
}

function moveButtonHelper(button) {
    const maxWidth = viewingArea.offsetWidth - button.offsetWidth;
    const maxHeight = viewingArea.offsetHeight - button.offsetHeight;
    let directionX = Math.random() < 0.5 ? -1 : 1;
    let directionY = Math.random() < 0.5 ? -1 : 1;
    
    button.interval = setInterval(() => {
        const currentLeft = parseInt(button.style.left) || 0;
        const currentTop = parseInt(button.style.top) || 0;
        
        let newLeft = currentLeft + directionX;
        let newTop = currentTop + directionY;
        
        if (newLeft <= 0 || newLeft >= maxWidth) {
            directionX *= -1;
            newLeft += directionX;
        }
        
        if (newTop <= 0 || newTop >= maxHeight) {
            directionY *= -1;
            newTop += directionY;
        }
        
        button.style.left = `${newLeft}px`;
        button.style.top = `${newTop}px`;
    }, 5);
}
