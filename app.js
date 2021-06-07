const Q = selectors => document.querySelector(selectors);

const btnstart = Q("#btn-start")
const btnstop = Q("#btn-stop")
const displaySeconds = Q('#times');

let startTime = 0;
let interval;
let started = false; // инициализируем таймер для проверки остановлен таймер или запущен
let passed = 0; // запись сколько прошло времени

/**
 * @return {string} state started|stopped|paused
 */
function  getStates(){ // определения состояния функции

    if(!passed && !started){ //если пустое значение и не запущенна фу-я;
        return  "stopped";
    }

    if(started && passed ){ // если функция запущена
        return  "started"
    }
    if(!started && passed){ // функция во время запуска поставлена на паузу
        return  "paused";
    }
}

//функция запуска
function start() {
    let currentState = getStates();

    if(currentState === "started"){
        pause();

    }if(currentState === "stopped"){
        startTime = +new Date();
        interval = setInterval(render, 1)
        started = true;
    }
    if(currentState === "paused" ){
       startTime = +new Date() - passed;
        interval = setInterval(render, 1)
        started = true;

    }
}

//функция отрисовки

function render() {
    passed = (new Date() - startTime);
    let milliseconds = passed % 1000;
    let seconds = ((passed % 60000) - milliseconds) / 1000;
    let minutes = Math.floor(passed / 60000);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    displaySeconds.innerHTML = `${minutes}:${seconds}.${milliseconds}`;

}

function pause (){
    clearInterval(interval);
    started = false;
}

function stop() {
    clearInterval(interval)
    started = false;
    displaySeconds.innerHTML = "00:00.000";
    passed = 0;
}

btnstart.addEventListener("click", start);
btnstop.addEventListener("click", stop);



