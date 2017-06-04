var gNotes = [{ color: 'blue' },{ color: 'lightred' }, { color: 'lightgreen' }, { color: 'lightblue' }]

var gState;

$(document).ready(init);


function getInitialState() {
    return {
        seqIdxs: [],
        isUserTurn: false,
        currUserNoteIdx: 0
    }
}

function init() {
    gState = getInitialState();
    renderPiano();
    doComputerTurn();
}

function renderPiano() {
    var strHtmls = gNotes.map(function (note, i) {

        var strOnClick = ' onclick="noteClicked(this, ' + i + ')" ';
        var strHtml = '<button ' + strOnClick + ' style="background-color:' + note.color + '"></button>'
        return strHtml;
    });

    var $elPiano = $('.piano');
    $elPiano.html(strHtmls.join(''));
}


function doComputerTurn() {
    gState.currUserNoteIdx = 0;
    tellUser('Computer Turn');
    addNote();
    playNotesSeq();
}


function addNote() {
    var seqIdx = getRandomInt(0, gNotes.length);
    gState.seqIdxs.push(seqIdx);
}

function playNotesSeq() {
    var $elNotes = $('.piano button');
    gState.seqIdxs.forEach(function handleNote(seqIdx, i) {
        setTimeout(function () {
            playNote($elNotes[seqIdx]);
        }, 1000 * (i + 1));
    });

    // After all notes were played:
    setTimeout(function () {
        tellUser('Your Turn');
        gState.isUserTurn = true;
    }, 1000 * (gState.seqIdxs.length + 1));

}


// Called from DOM
function noteClicked(elNote, idxUserClicked) {
    if (!gState.isUserTurn) return;

    playNote(elNote);


    var noteIdxCorrect = gState.seqIdxs[gState.currUserNoteIdx];

    if ( idxUserClicked === noteIdxCorrect ) {
        // If user done playing the curr seq
        if (gState.currUserNoteIdx === gState.seqIdxs.length - 1) {
            doComputerTurn();
        } else {
            gState.currUserNoteIdx++;
        }
    } else {
        alert('Game Over, try Again!');
        init();
    }

}

function playNote(elNote) {
    var $elNote = $(elNote);
    $elNote.addClass('playing');
    setTimeout(function () {
        $elNote.removeClass('playing');
    }, 500)
}

function tellUser(msg) {
    var $elMsg = $('.msg');
    $elMsg.text(msg);
}
