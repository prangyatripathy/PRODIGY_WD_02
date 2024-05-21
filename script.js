// script.js
let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
        startStopButton.textContent = 'Pause';
    } else {
        running = false;
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    }
}

function reset() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        laps.push(elapsedTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lapTime, index) => `<li>Lap ${index + 1}: ${formatTime(lapTime)}</li>`).join('');
}

startStopButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

updateDisplay();  // Initialize the display
