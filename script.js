const dino = document.querySelector('#dino'),
        cactus = document.querySelector('#cactus'),
        sun = document.querySelector('#sun'),
        cloud = document.querySelector('#cloud'),
        startBtn = document.querySelector('#start'),
        end =  document.querySelector('.end'),
        refreshBtn = document.querySelector('.refreshBtn');
let counterSeconds = 0,
    counterMinutes = 0,
    seconds = document.querySelector('#seconds'),
    minutes = document.querySelector('#minutes'),
    isPaused = false,
    cloudAnimation,
    sunAnimation;

cactus.classList.add('cactusPaused');

refreshBtn.addEventListener('click', function() {
    location.reload();
});

document.addEventListener('keydown', jump);

let isAlive = setInterval(function() {
    let dinoBounds = dino.getBoundingClientRect();
    let cactusBounds = cactus.getBoundingClientRect();

    let dinoStyles = window.getComputedStyle(dino);
    let cactusStyles = window.getComputedStyle(cactus);

    // Получение актуальных габаритов элементов, включая отступы и рамки
    let dinoWidth = dinoBounds.width + parseFloat(dinoStyles.marginLeft) + parseFloat(dinoStyles.marginRight);
    let dinoHeight = dinoBounds.height + parseFloat(dinoStyles.marginTop) + parseFloat(dinoStyles.marginBottom);
    let cactusWidth = cactusBounds.width + parseFloat(cactusStyles.marginLeft) + parseFloat(cactusStyles.marginRight);
    let cactusHeight = cactusBounds.height + parseFloat(cactusStyles.marginTop) + parseFloat(cactusStyles.marginBottom);

    // Проверка на столкновение
    if (dinoBounds.left < cactusBounds.right &&
        dinoBounds.right > cactusBounds.left &&
        dinoBounds.top < cactusBounds.bottom &&
        dinoBounds.bottom > cactusBounds.top) {
        showEnd();
    }
}, 100);

function showEnd() {
    end.removeAttribute('hidden');
    isPaused = true;
    cloudAnimation.pause();
    sunAnimation.pause();
    dino.classList.add('jumpStopped');
    cactus.classList.add('cactusPaused');
    startBtn.hidden = true;
}

function jump() {
    if(dino.classList != 'jump') {
        dino.classList.add('jump');
    }
    setTimeout(function() {
        dino.classList.remove('jump');
    }, 500);
};

startBtn.addEventListener('click', startOrPauseGame);


function startOrPauseGame() {
    cactus.classList.add('cactusAnimated');
    cactus.classList.toggle('cactusPaused');
    if(!cloudAnimation && !sunAnimation && !isPaused) {
        cloudAnimation = cloud.animate([
            {transform: 'translateX(600px)'},
            {transform: 'translateX(500px)'},
            {transform: 'translateX(400px)'},
            {transform: 'translateX(300px)'},
            {transform: 'translateX(200px)'},
            {transform: 'translateX(100px)'},
            {transform: 'translateX(50px)'},
            {transform: 'translateX(0px)'},
            {transform: 'translateX(-50px)'},
            {transform: 'translateX(-100px)'},
            {transform: 'translateX(-150px)'},
            {transform: 'translateX(-200px)'},
            {transform: 'translateX(-250px)'},
            {transform: 'translateX(-300px)'},
            {transform: 'translateX(-350px)'},
            {transform: 'translateX(-400px)'},
            {transform: 'translateX(-450px)'},
            {transform: 'translateX(-500px)'},
            {transform: 'translateX(-550px)'},
            {transform: 'translateX(-600px)'},
            {transform: 'translateX(-650px)'},
            {transform: 'translateX(-700px)'},
        ], {
            duration: 3000,
            iterations: Infinity,
            delay: 800,
            easing: 'linear'
        });

        sunAnimation = sun.animate([
            {transform: 'rotate(0deg)'},
            {transform: 'rotate(90deg)'},
            {transform: 'rotate(180deg)'},
            {transform: 'rotate(270deg)'},
            {transform: 'rotate(360deg)'},
        ], {
            duration: 3000,
            iterations: Infinity,
            delay: 800,
            easing: 'linear'
        });

        window.setInterval(() => {
            if(!isPaused) {
                counterSeconds++;
                seconds.innerHTML = counterSeconds;
                if(counterSeconds < 10) {
                    seconds.innerHTML = '0' + counterSeconds;
                } else if(counterSeconds == 60) {
                    ++counterMinutes;
                    counterSeconds = 0;
                    seconds.innerHTML = '0' + counterSeconds;
                    minutes.innerHTML = counterMinutes + 1;
                    if(counterMinutes < 10) {
                        minutes.innerHTML = '0' + counterMinutes;
                    }
                };    
            }}, 1000)
    } else if(cloudAnimation.playState === 'running' && sunAnimation.playState === 'running') {
        isPaused = true;
        cloudAnimation.pause();
        sunAnimation.pause();
        dino.classList.add('jumpStopped');
    } else if(cloudAnimation.playState === 'paused' && sunAnimation.playState === 'paused') {
        isPaused = false;
        cloudAnimation.play();
        sunAnimation.play();
        dino.classList.remove('jumpStopped');
    }
};