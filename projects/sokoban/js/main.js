'use strict';

var gBoard;
var gIntervalTimer;
var gState;

function initGame() {

    document.querySelector('.popup').style.visibility = 'hidden';

    gState = {
        isGameOn: true,
        secsPassed: 0,
        steps: 0,
        playerPosition: { i: 8, j: 1 },
        boxesPositions: [
            { i: 2, j: 2 },
            { i: 7, j: 7 },
            { i: 2, j: 7 },
            { i: 7, j: 2 }
        ]
    }

    gBoard = buildBoard();
    renderBoard(gBoard);
}

function startGame() {
    // show timer
    var elTimer = document.querySelector('.timer');
    elTimer.style.visibility = 'visible';
    var elTime = elTimer.querySelector('span');
    elTime.innerText = gState.secsPassed;

    // show steps
    var elsteps = document.querySelector('.steps');
    elsteps.style.visibility = 'visible';
    var elstepsValue = elsteps.querySelector('span');
    elstepsValue.innerText = gState.steps;

    // start timer
    gIntervalTimer = setInterval(function () {
        gState.secsPassed++;
        // show timer and start count seconds
        elTime.innerText = gState.secsPassed
    }, 1000);
}

function buildBoard() {
    var board = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'target', 'target', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'target', 'target', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall',],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ];

    return board;
}

function addElBoxes() {
    gState.boxesPositions.forEach(function (position) {
        document.querySelector('#cell-' + position.i + '-' + position.j).classList.add('box');
    });
}

function renderBoard(board) {

    var oldBoard = document.querySelector('table');
    if (oldBoard) {
        oldBoard.parentNode.removeChild(oldBoard);
    }

    var elBoard = document.createElement('table');

    for (var i = 0; i < board.length; i++) {

        var elRow = document.createElement('tr');

        for (var j = 0; j < board[0].length; j++) {

            var elCell = document.createElement('td');
            var element = board[i][j];
            elCell.classList.add(element);
            //initial player position
            if (i === gState.playerPosition.i && j === gState.playerPosition.j) {
                elCell.classList.add('player');
            }
            elCell.setAttribute('id', 'cell-' + i + '-' + j);
            elRow.appendChild(elCell);
        }

        elBoard.appendChild(elRow);
    }
    document.querySelector('.box-sokoban').appendChild(elBoard);

    addElBoxes();
}

document.onkeydown = function (key) {
    if (gState.isGameOn) {
        var i;
        var j;
        var direction;
        switch (key.keyCode) {
            case 37:
                //left
                i = gState.playerPosition.i;
                j = gState.playerPosition.j - 1;
                direction = 'left';
                break;
            case 38:
                //up
                i = gState.playerPosition.i - 1;
                j = gState.playerPosition.j;
                direction = 'up';
                break;
            case 39:
                //right
                i = gState.playerPosition.i;
                j = gState.playerPosition.j + 1;
                direction = 'right';
                break;
            case 40:
                //down
                i = gState.playerPosition.i + 1;
                j = gState.playerPosition.j;
                direction = 'down';
                break;
        }
        if (direction) {
            move(direction, { i, j });
        }
    }
}

function move(direction, destination) {
    // on the first press, start game
    if (!gIntervalTimer) {
        startGame();
    }

    //set destination
    var i = destination.i;
    var j = destination.j;

    //check if destination clear
    var isThereBox = gState.boxesPositions.some(function (position) {
        return position.i === i && position.j === j;
    });

    var isDestinationClear;
    if (isThereBox) {
        var start = { i: i, j: j };
        isDestinationClear = moveBox(start, direction);
    } else isDestinationClear = true;

    var condition =
        (
            gBoard[i][j] === 'floor'
            ||
            gBoard[i][j] === 'target'
        )
        &&
        isDestinationClear;

    if (condition) {

        gState.steps++;

        document.querySelector('.steps').querySelector('span').innerText = gState.steps;

        var i = gState.playerPosition.i;
        var j = gState.playerPosition.j;
        //remove player from current position

        document.querySelector('#cell-' + i + '-' + j).classList.remove('player');
        //put player on the new position
        i = destination.i;
        j = destination.j;
        document.querySelector('#cell-' + i + '-' + j).classList.add('player');
        gState.playerPosition = destination;

        if (isVictory()) {
            popupVictory();
        }
    }
}

function moveBox(start, direction) {
    var i;
    var j;
    // set destination
    switch (direction) {
        case 'left':
            i = start.i;
            j = start.j - 1;
            break;
        case 'up':
            i = start.i - 1;
            j = start.j;
            break;
        case 'right':
            i = start.i;
            j = start.j + 1;
            break;
        case 'down':
            i = start.i + 1;
            j = start.j;
            break;
    }
    //check if there is another box in destination
    var isThereBox = gState.boxesPositions.some(function (position) {
        return position.i === i && position.j === j;
    });

    if (gBoard[i][j] === 'wall' || isThereBox) {
        return false;
    }

    //update box position in model
    gState.boxesPositions.forEach(function (position) {
        if (position.i === start.i && position.j === start.j) {
            position.i = i;
            position.j = j;
        }
    });

    //update view
    var elOldCell = document.querySelector('#cell-' + start.i + '-' + start.j);
    elOldCell.classList.remove('box');
    elOldCell.classList.remove('box-on-target');

    var elNewCell = document.querySelector('#cell-' + i + '-' + j);
    if (gBoard[i][j] === 'target') {
        elNewCell.classList.add('box-on-target');
    } else {
        elNewCell.classList.add('box');
    }
    return true;
}

function isVictory() {
    return gState.boxesPositions.every(function (position) {
        return gBoard[position.i][position.j] === 'target';
    });
}

function popupVictory() {

    var elTime = document.querySelector('.value-time');
    elTime.innerText = gState.secsPassed;
    var elScore = document.querySelector('.value-final-score');
    elScore.innerText = 100 - gState.steps;

    var elPopup = document.querySelector('.popup')
    elPopup.style.opacity = 1;
    elPopup.style.visibility = 'visible';

    gState.isGameOn = false;
    clearInterval(gIntervalTimer);
    gIntervalTimer = 0;
    document.querySelector('.timer').style.visibility = 'hidden';
    document.querySelector('.steps').style.visibility = 'hidden';
}