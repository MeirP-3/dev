'use strict'
//in progress
function binarySearchIndexOf(elements, compareFunc) {
    
    function search(idxToStart, idxToStop) {
        var range = idxToStop - idxToStart;
        if (range < 2) {
            return -1;
        }
        var currIdx = idxToStart + Math.ceil(range / 2);
        //in progress here
        compareFunc(elements[currIdx])
    }

    var idxToStart = 0;
    var idxToStop = elements.length - 1;
    search(idxToStart, idxToStop);
}