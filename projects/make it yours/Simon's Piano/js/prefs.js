

var KEY_PREFS_OBJ = 'prefsObj';

function initPrefs() {
    var prefsObj = loadFromStorage(KEY_PREFS_OBJ);
    // console.log('Stop! thowing');
    if (prefsObj) applyPrefs(prefsObj);
}

function applyPrefs(prefsObj) {
    for (var prop in prefsObj) {
        document.body.style[prop] = prefsObj[prop];
    }
}

function savePrefs() {

    var prefsObj = {};
    var elTxtBgColor = document.querySelector('#txtBgColor');
    prefsObj.backgroundColor = elTxtBgColor.value;

    var elTxtTextColor = document.querySelector('#txtTextColor');
    prefsObj.color = elTxtTextColor.value;

    // var elTxtFontSize = document.querySelector('#txtFontSize');
    // prefsObj.fontSize = elTxtFontSize.value;

    applyPrefs(prefsObj);

    saveToStorage(KEY_PREFS_OBJ, prefsObj);
}

