const settingsButton = document.querySelector('.settings');
const startButton = document.querySelector('.start');
const seconds = document.querySelector('.seconds > input[type=text]');
const minutes = document.querySelector('.minutes > input[type=text]');
const ring = document.querySelector('.ring');

let startTime =0 ;
let timer =null;
let running =false;
let originalMinutes = 0;
let originalSeconds = 0;

startButton.addEventListener('click', () => {
    if(!running){
        startTimer();
    }else if(running){
        pauseTimer();
    }
});

const startTimer = () => {
    running = true;
    startButton.innerText = 'Pause';
    startTime = Date.now();
    const secondsValue = parseInt(seconds.value);
    const minutesValue = parseInt(minutes.value);
    totalSeconds = secondsValue + minutesValue * 60;
    timer = setInterval(() => {
        console.log("Intervalling")
        const currentTime= Date.now();
        const diff = currentTime - startTime;
        const secondsLeft = totalSeconds - Math.floor(diff/1000);
        const minutesLeft = Math.floor(secondsLeft/60);
        seconds.value = padNumber(secondsLeft);
        minutes.value = padNumber(minutesLeft);

        if(secondsLeft === 0 && minutesLeft === 0) {
            finishTimer();
        }
    }, 1000)
}

const pauseTimer = () => {
    running = false;
    startButton.innterText = "Start";
    clearInterval(timer);
}

const padNumber = (number) => {
    if(number < 10) {
        return "0" + number;
    }
    return number;
}

const finishTimer = () => {
    clearInterval(timer);
    ring.classList.add('ending');
    setTimeout(() => {
        alert("Time's up!");
        resetTimer();
    }, 0);
    console.log("Finished");
}

const resetTimer = () => {
    console.log("resetting")
}