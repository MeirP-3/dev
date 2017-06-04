'use strict';

const MINE = 'X';
const CLEAR = '';
const VICTORY = 1;

var gLevel = {
    SIZE: 8,
    MINES: 15
};

var gBoard = [];
var gState;

var gIntervalTimer;

function buildBoard(size, mines) {
    var minesPercentage = mines / (size * size);
    var temp;
    var curr;
    do {
        var board = [];
        for (var i = 0; i < size; i++) {
            board.push([]);
            for (var j = 0; j < size; j++) {
                temp = Math.random();
                curr = (temp < minesPercentage) ? MINE : CLEAR;
                board[i].push(curr);
            }
        }
    } while (countMines(board, mines) !== mines);
    return board;
}

function countMines(board, desiredCount) {
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            count += (board[i][j] === MINE) ? 1 : 0;
        }
    }
    return count;
}

function setMinesNegsCount(board) {
    board.forEach(function (row, rowIndex) {
        row.forEach(function (cell, collumnIndex) {
            setCell(board, rowIndex, collumnIndex);
        });
    });
}

function setCell(board, row, collumn) {

    // count of neighbours that are mines
    var mineNegs = 0;

    // making sure not to try i = -1 or j = -1
    var i = Math.max(0, row - 1);

    // looping through all the cells around the current cell:
    // from i - 1, j - 1 (top left) to i + 1, j + 1 (bottom right).

    while (
        (i <= row + 1)
        &&
        (i < board.length)
    ) {
        // zeroing j
        var j = Math.max(0, collumn - 1);

        while (
            (j <= collumn + 1)
            &&
            (j < board[0].length)
        ) {
            // the cell itself does not count:
            var notItSelf = (i !== row || j !== collumn)
            if (notItSelf && board[i][j] === MINE) mineNegs++;
            j++;
        }
        i++;
    }
    if (board[row][collumn] !== MINE) {
        if (mineNegs === 0) {
            board[row][collumn] = CLEAR;
        } else {
            board[row][collumn] = mineNegs;
        }
    }
}

function initGame(level) {

    var elSelectLevel = document.querySelector('select');
    elSelectLevel.style.display = 'initial';

    var popup = document.querySelector('.popup');
    popup.style.visibility = 'hidden';
    popup.querySelector('.victory').innerText = '';
    popup.querySelector('.play-time').innerText = '';
    popup.querySelector('.game-over').innerText = '';

    switch (level) {
        case 'beginner':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 'medium':
            gLevel.SIZE = 6;
            gLevel.MINES = 5;
            break;
        case 'expert':
            gLevel.SIZE = 8;
            gLevel.MINES = 15;
            break;
    }

    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        markedCoordinates: [],
        shownCoordinates: [],
        secsPassed: 0
    };

    gIntervalTimer = 0;

    if (level) {
        gBoard = buildBoard(gLevel.SIZE, gLevel.MINES);
        setMinesNegsCount(gBoard);

        renderBoard('.mine-sweeper');
        console.table(gBoard);
    }
}

function startGame() {

    // hide level selection
    var elSelectLevel = document.querySelector('select');
    elSelectLevel.style.display = 'none';

    // show timer
    var elTimer = document.querySelector('.timer');
    elTimer.style.visibility = 'visible';
    var elTime = elTimer.querySelector('span');
    elTime.innerText = gState.secsPassed;

    // start timer
    gIntervalTimer = setInterval(function () {
        gState.secsPassed++;
        // show timer and start count seconds
        elTime.innerText = gState.secsPassed
    }, 1000);
}


function renderBoard(selectorTbl) {

    var elMine = '<div class="mine">💣</div>';
    //'<img src="img/mine.png" alt="mine">';
    var elHide = '<div class="hide"></div>'
    //'<img src="img/hide.jpg" alt="hidden cell" class="hide-img">';
    var elSuspected = '<div class="suspected">?</div>';
    //'<img src="img/suspected.png" alt="suspected" class="suspected">
    var elClearPart1 = '<div class="clear">';
    var elClearPart2 = '</div>';

    var strHtml = '';

    gBoard.forEach(function (row, i) {

        strHtml += '<tr>\n';
        row.forEach(function (cell, j) {

            strHtml += '\t<td class="cell cell-' + i + '-' + j + '" oncontextmenu="cellMarked(this, '
                + i + ', ' + j + ')" onclick="cellClicked(this, ' + i + ', ' + j + ')">'
                + elSuspected + elHide + '<div class="content">';


            if (cell === MINE) {
                strHtml += elMine;
            } else {
                strHtml += elClearPart1 + cell + elClearPart2;
            }

            strHtml += '</div></td>\n';

        });
        strHtml += '</tr>\n';

    });

    var elTable = document.querySelector(selectorTbl);
    elTable.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
    if (gState.isGameOn === true) {
        if (!gIntervalTimer) {
            startGame();
        }
        if (!isShown(i, j)) {
            showCell(elCell, i, j);
            var gameState = checkGameOver(i, j);
            if (gameState) {
                if (gameState === VICTORY) {
                    informVictory();
                } else {
                    var elMine = elCell.querySelector('.mine');
                    elMine.classList.add('stepped-mine');
                    // elMine.classList.add('stepped-mine');
                    informGameOver();
                }
            }
            if (gBoard[i][j] === CLEAR) {
                expandShown(i, j);
            }
        }
    }
}

//
function isShown(i, j) {
    return gState.shownCoordinates.some(function (coordinate) {
        return coordinate.i === i && coordinate.j === j;
    });
}

function expandShown(row, collumn) {
    var minRow = Math.max(0, row - 1);
    var minCollumn = Math.max(0, collumn - 1);
    for (var i = minRow; i <= row + 1 && i < gBoard.length; i++) {
        for (var j = minCollumn; j <= collumn + 1 && j < gBoard[0].length; j++) {
            var elCell = document.querySelector('.cell-' + i + '-' + j);
            cellClicked(elCell, i, j);
        }
    }
}

function showCell(elCell, i, j) {
    //update model
    gState.shownCount++;
    gState.shownCoordinates.push({ i: i, j: j });

    //clean mark if exist
    cleanMark(elCell, i, j);

    elCell.oncontextmenu = 'return false';
    var content = elCell.querySelector('.content');
    // console.log(content);
    content.style.display = 'inline';
    // console.log(content);
    elCell.querySelector('.hide').style.display = 'none';
}

function isMarked(i, j) {
        return gState.markedCoordinates.some(function (coordinate) {
            return coordinate.i === i && coordinate.j === j;
        });
}

function cellMarked(elCell, i, j) {
    
    if (gState.isGameOn === true) {

        if (isMarked(i, j)) {
            cleanMark(elCell, i, j);
        } else {
            // update model
            gState.markedCoordinates.push({ i: i, j: j });
            gState.markedCount++;

            //update view
            elCell.querySelector('.hide').style.display = 'none';
            elCell.querySelector('.suspected').style.display = 'block';

            // console.log('marked: ', gState.markedCount, 'shown: ', gState.shownCount);

            var gameState = checkGameOver(i, j);
            if (gameState === VICTORY) {
                informVictory();
            }
        }
    }
}

function cleanMark(elCell, i, j) {
    // console.table(gState.markedCoordinates);
    var cellIndex = gState.markedCoordinates.findIndex(function (coordinate) {
        return coordinate.i === i && coordinate.j === j;
    });
    // console.log('cell index in marked coordinates:', cellIndex);
    if (cellIndex > -1) {
        gState.markedCoordinates.splice(cellIndex, 1);
        gState.markedCount--;
    }

    // update view
    elCell.querySelector('.suspected').style.display = 'none';
    elCell.querySelector('.hide').style.display = 'block';

}

function checkGameOver(i, j) {
    if (
        (isMarked(i, j) || gBoard[i][j] !== MINE)
        &&
        gState.markedCount === gLevel.MINES
        &&
        gState.shownCount === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES
    ) {
        return VICTORY;
    } else if (gBoard[i][j] === MINE) {
        return -1;
    }
}


function informVictory() {
    var markedCoordinates = gState.markedCoordinates.slice(0, gState.markedCoordinates.length);
    markedCoordinates.forEach(function (coordinate, index, arr) {
        var elMine = document.querySelector('.cell-' + coordinate.i + '-' + coordinate.j);
        showCell(elMine, coordinate.i, coordinate.j);
    });
    gState.isGameOn = false;
    clearInterval(gIntervalTimer);
    document.querySelector('.timer').style.visibility = 'hidden';
    showVictoryPopup();
}

function informGameOver() {
    gState.isGameOn = false;
    gBoard.forEach(function (row, rowIdx) {
        row.forEach(function (cell, collumnIdx) {
            var elCell = document.querySelector('.cell-' + rowIdx + '-' + collumnIdx);
            var isShown = gState.shownCoordinates.some(function (coordinate) {
                return coordinate.i === rowIdx && coordinate.j === collumnIdx;
            });
            if (!isShown) {
                showCell(elCell);
            }
        })
    })
    clearInterval(gIntervalTimer);
    gIntervalTimer = 0;
    document.querySelector('.timer').style.visibility = 'hidden';
    showGameOverPopup();
}

function showVictoryPopup() {
    var elVictory = document.querySelector('.victory');
    elVictory.innerText = 'VICTORY!';
    showPopup();
}

function showGameOverPopup() {

    var elGameOver = document.querySelector('.game-over');
    elGameOver.innerText = 'Game Over!';
    showPopup();
}

function showPopup() {

    var elTime = document.querySelector('.play-time');
    elTime.innerText = 'Play Time: ' + gState.secsPassed + ' seconds';

    var elPopup = document.querySelector('.popup')
    elPopup.style.opacity = 1;
    elPopup.style.visibility = 'visible';
}
