const settingsButton = document.querySelector('.settings');
const startButton = document.querySelector('.start');
const seconds = document.querySelector('.seconds > input[type=text]');
const minutes = document.querySelector('.minutes > input[type=text]');
const ring = document.querySelector('.ring');

let startTime = 0 ;
let timer =null;
let running =false;
let originalMinutes = 0;
let originalSeconds = 0;
let totalSeconds;

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
        seconds.value = padNumber(secondsLeft% 60);
        minutes.value = padNumber(minutesLeft);

        if(secondsLeft === 0 && minutesLeft <= 0) {
            finishTimer();
        }
    }, 1000)
};

const pauseTimer = () => {
    running = false;
    startButton.innerText = 'Start';
    clearInterval(timer);
};

const finishTimer = () => {
    clearInterval(timer);
    ring.classList.add('ending');
    setTimeout(() => {
        alert("Time's up!");
        resetTimer();
    }, 0);
    console.log("Finished");
};

const validateTimeInput = (e) => {
    const validatedInput = e.target.value.replace(/[^0-9]/g, '').substring(0,2);
    e.target.value = validatedInput;
};

minutes.addEventListener('keyup', validateTimeInput);
seconds.addEventListener('keyup', validateTimeInput);

settingsButton.addEventListener('click', () => {
    if(running){
        pauseTimer();
    }
    seconds.disabled = false;
    minutes.disabled = false;
});

const resetTimer = () => {
    console.log("resetting")
    clearInterval(timer);
    seconds.vaule = originalSeconds;
    minutes.value = originalMinutes;
    startButton.innerText = "Start";
    ring.classList.remove('ending');
    running = false;
}

const padNumber = (number) => {
    if(number < 10) {
        return "0" + number;
    }
    return number;
}
const setOriginalTime = () => {
    originalMinutes = padNumber(parseInt(minutes.value));
    originalSeconds = padNumber(parseInt(seconds.value));
}

setOriginalTime();
resetTimer();
