'use strict';

var gElCars;
var gCars;
var gIntervalRace;
var gElRoad;


function initGame() {
    gElCars = document.querySelectorAll('.car');
    gElRoad = document.querySelector('.road');
}

function startRace() {
    gCars = getCars();
    gIntervalRace = setInterval(moveCars, 50);

    gElRoad.classList.add('game-on');
    toggleElementVisibility('.btn-start');
}

function getCars() {
    var cars = [{ driver: 'gamer 1', distance: 5, speed: 1, isKey1Up: false, isKey2Up: false }, { driver: 'gamer 2', distance: 5, speed: 1, isKey1Up: false, isKey2Up: false }];
    return cars;
}

function moveCars() {

    var isVictory = false;

    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i];
        var elCar = gElCars[i];

        car.distance += car.speed;
        elCar.style.marginLeft = car.distance + 'px';

        if (car.distance > gElRoad.offsetWidth) isVictory = true;

        // when game is over, cars return to starting point
        if (!gIntervalRace) {
            isVictory = false;
            elCar.style.marginLeft = '5px';
        }
    }

    if (isVictory) informVictory();
}

function handleKey(key) {
    switch(key.code) {
        case 'ArrowUp':
            gCars[0].isKey1Up = true;
        break;
        case 'ArrowDown':
            gCars[0].isKey2Up = true;
        break;
        case 'Digit1':
            gCars[1].isKey1Up = true;
        break;
        case 'Digit2':
            gCars[1].isKey2Up = true;
        break;
        default: return;
    }
    // can be implemented by loop
    if (gCars[0].isKey1Up && gCars[0].isKey2Up) {
        gCars[0].speed ++;
        gCars[0].isKey1Up = false;
        gCars[0].isKey2Up = false;
    } else if (gCars[1].isKey1Up && gCars[1].isKey2Up) {
        gCars[1].speed ++;
        gCars[1].isKey1Up = false;
        gCars[1].isKey2Up = false;
    }

}

function informVictory() {

    clearInterval(gIntervalRace);
    gIntervalRace = 0;

    // Find the car with max distance
    var carWinning = gCars.reduce(function (maxDistanceCar, car) {
        if ((!maxDistanceCar) || car.distance > maxDistanceCar.distance) {
            return car;
        } else return maxDistanceCar;
    }, null);

    showVictoryPopup(carWinning);

}

function showVictoryPopup(car) {

    var elPopup = document.querySelector('.popup');
    var elCarName = elPopup.querySelector(':nth-child(2)');

    elPopup.style.visibility = 'visible';
    elPopup.style.opacity = 1;

    elCarName.innerText = (car.driver).toUpperCase() + '!!!';
}

function hideVictoryPopup() {
    var elPopup = document.querySelector('.popup');
    elPopup.style.opacity = 0;
    elPopup.style.visibility = 'hidden';
    toggleElementVisibility('.btn-start');
    moveCars();
    gElRoad.classList.remove('game-on');
}