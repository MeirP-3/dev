'use strict';

// About Exceptions Handling with try-catch-finally
// function foo() {
//     console.log('foo start');
//    if (false || 1) throw new Error('Not good!')
//     console.log('foo end');
// }

// function goo() {
//     try {
//         foo();
//     } catch (err) {
//         console.log('goo cought foo error', err);
//         momo.popo = 9;
//     } finally {
//         console.log('Finally!');
//     }
//     console.log('goo continues');
// }

// goo();


function saveToStorage(key, any) {
    try {
        localStorage.setItem(key, JSON.stringify(any));
    } catch (err) {
        console.error('Problem saving to storage', err);
    }
}

function loadFromStorage(key) {
    var any = null;
    try {
        any = JSON.parse(localStorage.getItem(key));
    } catch (err) {
        console.warn('Removing Corrupted data from storage', err);
        localStorage.removeItem(key);
    }
    return any;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function openWin() {
    var popup = window.open('https://google.com','','width=100,height=80')
    //popup.document.write("a Popup")
    //popup.focus()
    
}

// var windowObjectReference;
// var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

// function openRequestedPopup() {
//   windowObjectReference = window.open("http://www.cnn.com/", "CNN_WindowName", strWindowFeatures);
// }