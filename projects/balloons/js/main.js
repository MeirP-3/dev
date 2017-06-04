'use strict';

var gBalloons = [
    {
        name: 'ballon-1',
        bottom: 60,
        opacity: 1
    },
    {
        name: 'ballon-2',
        bottom: 60,
        opacity: 1
    }
];

var gInterval = 0;

function releaseBalloons() {
    gInterval = setInterval(function () {
        gBalloons.forEach(function (balloon, idx) {
            balloon.bottom ++;
            var elBalloon = document.querySelector(".balloon-" + (idx + 1));
            elBalloon.style.bottom = balloon.bottom + 'px';
        });
        if (gBalloons[0].bottom > 450) clearInterval(gInterval);
    }, 50);
}

function balloonClicked(elBalloon) {

    var id = elBalloon.id.substr(1, 1) - 1;

    var fadeInterval = setInterval(function () {

        gBalloons[id].opacity -= 0.1;
        elBalloon.style.opacity = gBalloons[id].opacity;

        if (opacity === 0) {
            clearInterval(fadeInterval);
        }

    }, 100);
}
