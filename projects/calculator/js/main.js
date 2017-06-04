'use strict'

var gCurrStrNum = '';
var gNum = undefined;
var gAccumulator;
var gOperator;
var gMemory;

function addDigit(digit) {
    if (gCurrStrNum || digit !== 0) {
        gCurrStrNum += digit;
        showOnPanel(gCurrStrNum);
    }
}

function showOnPanel(num) {
    var elPanel = document.querySelector('.panel');
    elPanel.innerText = num;
}


function setOperator(operator) {
    if (gCurrStrNum) {
        if (gOperator) gAccumulator = calcResult();
        else gAccumulator = +gCurrStrNum; 
    }
    gOperator = operator;
    gCurrStrNum = '';
}

function calcResult() {
    if (gOperator) {
        switch (gOperator) {
            case '+':
                gAccumulator += +gCurrStrNum;
                break;
            case '-':
                gAccumulator -= +gCurrStrNum;
                break;
            case '*':
                gAccumulator *= +gCurrStrNum;
                break;
            case '/':
                gAccumulator /= +gCurrStrNum;
                break;
                //experimental
            // case '%':
            //     gAccumulator = +gCurrStrNum;
            //     break;
                //
        }
        gOperator = undefined;
        gCurrStrNum = '';
        return gAccumulator;
    }
}

function showResult() {
    var result = calcResult();
    if (result) showOnPanel(result);
}

function clearPanel() {
    gOperator = undefined;
    gCurrStrNum = '';
    gAccumulator = undefined;
    showOnPanel(0);
}

function clearChar() {
    if (gCurrStrNum) {
        gCurrStrNum = gCurrStrNum.slice(0, -1);
        showOnPanel(+gCurrStrNum);
    } else if (gAccumulator) {
        var newNum = (gAccumulator.toString()).slice(0, -1);
        gAccumulator = +newNum;
        showOnPanel(gAccumulator);
    }
}

function negate() {
    if (gCurrStrNum) {
        gCurrStrNum = (- +gCurrStrNum).toString();
        showOnPanel(+gCurrStrNum);
    } else {
        if (gAccumulator) {
            showOnPanel(-gAccumulator);
        }
    }
}