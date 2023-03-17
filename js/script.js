const NUM_ROWS = 5;
const NUM_COLS = 5;
const LIGHTS_OFF_COLOR = 'gray';
const LIGHTS_ON_COLOR = 'orange';
const grid = []

const gameTableEl = document.getElementById('game-table');

function initializeGameTable() {

    for (let row = 0; row < NUM_ROWS; row++) {
        const tableRowEl = document.createElement('tr');

        for (let col = 0; col < NUM_COLS; col++) {

            const lightNumber = (row * NUM_ROWS) + col;

            const tableDataEl = document.createElement('td');
            tableDataEl.style.backgroundColor = LIGHTS_OFF_COLOR;
            tableDataEl.setAttribute('id', lightNumber.toFixed());
            tableRowEl.appendChild(tableDataEl);
            
            grid.push(tableDataEl);
        }

        gameTableEl.appendChild(tableRowEl);
    }
}

/**
 * Toggle all lights and check if you won
 * @param {object} event 
 */
function toggleLights(event) {
    const clickedLightCellEl = event.target;
    const lightNumber = parseInt(clickedLightCellEl.getAttribute('id'));

    // Toggle color for selected td element
    toggleSingleLight(grid[lightNumber]);

    // NOT first row, toggle color for TOP td element
    if (lightNumber >= NUM_COLS) {
        toggleSingleLight(grid[lightNumber - NUM_COLS]);
    }

    // NOT right edge, toggle color for RIGHT td element
    if ((lightNumber + 1) % NUM_COLS !== 0) {
        toggleSingleLight(grid[lightNumber + 1]);
    }

    // NOT on left edge, toggle color for LEFT td element
    if (lightNumber % NUM_COLS !== 0) {
        toggleSingleLight(grid[lightNumber - 1]);
    }

    // NOT last row, toggle color for BOTTOM td element
    if (lightNumber < NUM_ROWS * NUM_COLS - NUM_COLS) {
        toggleSingleLight(grid[lightNumber + NUM_COLS]);
    }

    // Check if all the lights are ON
    checkWin();
}

/**
 * Toggle a single light on/off
 * @param {element object} lightCellEl 
 */
function toggleSingleLight(lightCellEl) {

    // Get the current background color of the td element
    const bgColor = lightCellEl.style.backgroundColor;

    // If the light is on, turn it off,
    //lightCellEl.style.backgroundColor = LIGHTS_OFF_COLOR;
    if (bgColor === LIGHTS_ON_COLOR) {
        lightCellEl.style.backgroundColor = LIGHTS_OFF_COLOR;
    }

    // If the light is off, turn it on,
    //lightCellEl.style.backgroundColor = LIGHTS_ON_COLOR;
    if (bgColor === LIGHTS_OFF_COLOR) {
    lightCellEl.style.backgroundColor = LIGHTS_ON_COLOR;
    }
}

/**
 * Check if all lights are ON
 */
 function checkWin() {

     // Check if all lights are on, i.e. backgroundColor === LIGHTS_ON_COLOR
     let lightsOn = 0;

     for (let i = 0; i < gtid.length; i++) {
         const bgColor = grid[i].style.backgroundColor;

         if (bgColor === LIGHTS_ON_COLOR) {
             lightsOn += 1;
         }
     }

    // Display the user won
    if (lightsOn === grid.length) {
        alert('YOU WIN!');
    }
}

/**
 * Randomize lights on/off
 */
function randomizeLights(){

    // For each light in the grid, randomly turn one on or off
    // for (let i = 0; i < grid.length; i++) {
    //     const trueFalseRandom = Math.random() < 0.5;
    //     if (trueFalseRandom) {
    //         toggleSingleLight(grid[i]);
    //     }
    // }

    grid.forEach((eachLightElement) => {
        const trueFalseRandom = Math.random() < 0.5;

        if (trueFalseRandom) {
            toggleSingleLight(eachLightElement);
        }
    })
}


/*
 * Listeners for mouse click events
 */
document.addEventListener('DOMContentLoaded', () => {

    initializeGameTable();

    const lightElements = document.querySelectorAll('td');

    for (let i = 0; i < lightElements.length; i++) {
        lightElements[i].addEventListener('click', toggleLights);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', randomizeLights);
});