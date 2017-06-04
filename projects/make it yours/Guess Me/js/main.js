var KEY_STORAGE = 'questTree';

var gQuestTree = getQuestTree();
var gState;
var $els;

function getQuestTree() {
    var questTree;
    
    questTree = loadFromStorage(KEY_STORAGE);
    if (questTree) return questTree;

    var q1 = createQuest('Mati Caspi!','http://www.telavivcity.com/allsites/allpic/e/E10849/E10849pic5318.jpg');
    var q2 = createQuest('Oren Hazan!', 'http://www.jpost.com/HttpHandlers/ShowImage.ashx?id=382760&w=898&h=628');
    var q3 = createQuest('Singer?', null, q1, q2);
    var q4 = createQuest('Ofra!', 'http://i-cias.com/e.o/slides/haza_o02.jpg');
    var q5 = createQuest('Male?', null, q3, q4);

    questTree = q5;
    return questTree;
}

$(document).ready(init);

function init() {
    $els = {
        welcomeContainer: $('#welcome-container'),
        questContainer: $('#quest-container'),
        questNew: $('#quest-new')
    }
    gState = getInitialState();
    $els.questContainer.hide();
    $els.questNew.hide();
    $els.welcomeContainer.show();

}

function getInitialState() {
    return {
        currQuest: gQuestTree,
        prevQuest: null
    };
}


function startGame() {
    $els.welcomeContainer.hide();
    renderQuest(gState.currQuest);
    $els.questContainer.show();
}

function renderQuest(quest) {
    $els.questContainer.children('h2').text(quest.txt);
    $els.questContainer.children('img').attr('src', quest.url);
}

function userAns(isCorrect) {

    // If this is a final guess!
    if (!gState.currQuest.yesQuest) {
        if (isCorrect) {
            alert('Victorious');
            init();
        } else {
            $els.questContainer.hide();
            $els.questNew.show();
        }
    } else {
        // Keep the quest before moving on
        gState.prevQuest = gState.currQuest;

        // Move on to the next quest
        gState.currQuest = (isCorrect) ? gState.currQuest.yesQuest : gState.currQuest.noQuest;
        renderQuest(gState.currQuest);
    }
}

function addNewQuest() {
    var newName = $('#newName').val();
    var newImgUrl = $('#newImgUrl').val();
    var newQuest = $('#newQuest').val();

    var objNewName = createQuest(newName, newImgUrl)
    var objNewQuest = createQuest(newQuest, null, objNewName, gState.currQuest)

    // See if new quest should be connected to the parent's yes / no child
    if (gState.prevQuest.yesQuest === gState.currQuest) {
        gState.prevQuest.yesQuest = objNewQuest;
    } else {
        gState.prevQuest.noQuest = objNewQuest;
    }

    saveToStorage(KEY_STORAGE, gQuestTree);
    init();

}

function createQuest(txt,  url, yesQuest , noQuest ) {
    yesQuest    = yesQuest || null;
    noQuest     = noQuest || null;
    return { txt: txt, url: url, yesQuest: yesQuest, noQuest: noQuest};
}

