const DEFAULT_GRID_SIZE = 16;
let newGridSize;
let color = '#000000';

// builds the grid inside the container div
function buildGrid(gridSize) {
    let divs = [];
    for (let i = 0; i < gridSize; i++) {
        divs[i] = document.createElement('div');
        divs[i].className = 'box-container';
        for (let j = 0; j < gridSize; j++) {
            const box = document.createElement('div');
            box.className = 'box';
            divs[i].appendChild(box);
        }
        document.getElementById('main-container').appendChild(divs[i]);
    }
}

// removes the existing grid, so that a new one can be build afterwards
function removeGrid() {
    let elementsToRemove = document.getElementsByClassName('box-container');
    while (elementsToRemove.length > 0) {
        elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
    }
}

// changes the color of the hovered squares
function colorBoxes() {
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i ++) {
        boxes[i].addEventListener('mousemove', function() {
            boxes[i].style.backgroundColor = color;
        })
    }
}

const clearButton = document.getElementById('grid-change-button');
clearButton.addEventListener('click', function() {
    removeGrid();
    newGridSize ? buildGrid(newGridSize) : buildGrid(DEFAULT_GRID_SIZE);
    colorBoxes();
})

const slider = document.getElementById('grid-change-slider');
slider.addEventListener('change', function(e) {
    newGridSize = e.target.value;
    removeGrid();
    buildGrid(newGridSize);
    colorBoxes();
})

Coloris({
    theme: 'polaroid',
    themeMode: 'dark',
    alpha: false,
    formatToggle: true,
    swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        'rgb(244,162,97)',
        '#e76f51',
        '#d62828',
        'navy',
        '#07b',
        '#0096c7'
      ]
});

document.addEventListener('coloris:pick', (e) => {
    color = e.detail.color;
});

// builds the grid with the default value
buildGrid(DEFAULT_GRID_SIZE);
colorBoxes();