'use strict';

var gSelectedBoxImg;
var gSelectedTxtImg;
var gChangeImgsInterval;
var gImgs = [
    {
        src: 'https://scotch.io/wp-content/uploads/2015/12/ng-forward-logo.png',
        description: 'angular',
    },
    {
        src: 'https://nativebase.io/assets/img/react-logo.png',
        description: 'react',
    },
    {
        src: 'https://www.desdevpro.com/media/2015/11/Vue_0tNa76p.png',
        description: 'vue.js',
    }
]

var gCurrImgs = [
    {
        src: 'http://ecodile.com/wp-content/uploads/2015/10/node_icon2.png',
        description: 'javascript',
    },
    {
        src: 'http://pimg.p30download.com/APK_IMG/s/com.sololearn.csstrial/icon/icon_0_small.png',
        description: 'css',
    },
    {
        src:
        'https://wordhtml.com/images/wordhtml.png',
        description: 'html',
    }
]

function imgClicked(elBoxImg) {

    if (elBoxImg.classList.contains('clicked')) elBoxImg.classList.remove('clicked');
    else elBoxImg.classList.add('clicked');

    var elTxtImg = elBoxImg.querySelector('.txt-img');
    var id = +elBoxImg.id.substr(4, 1);
    elTxtImg.innerText = gCurrImgs[id].description;    

    // if the previous selected img was another imag
    if (gSelectedBoxImg && gSelectedBoxImg !== elBoxImg) {
        gSelectedBoxImg.classList.remove('clicked');
    }

    gSelectedBoxImg = elBoxImg;
}

function spliceRandomImg() {

    var imgIdx = getRandomIntInclusive(0, (gImgs.length)-1);
    var randomImg = gImgs.splice(imgIdx, 1)[0];
    return randomImg;

}

function changeImgs() {

    var newImgs = [];

    for (var i = 0; i < gCurrImgs.length; i++) {
        newImgs.push(spliceRandomImg());
    }

    for (var i = 0; i < gCurrImgs.length; i++) {
        gImgs.push(gCurrImgs.splice(i, 1, newImgs[i])[0]);
        
        // change the source of the current image element
        var elBoxImg = document.querySelector('#img-' + i);
        elBoxImg.classList.remove('clicked');
        elBoxImg.firstElementChild.src = gCurrImgs[i].src;
    }

    //update elImgs description
}

function changeImgsIn5Seconds() {
    setTimeout(changeImgs, 5000);
}

function changeImgsEvery2Seconds(elBtn) {
    if (!gChangeImgsInterval) {
        gChangeImgsInterval = setInterval(changeImgs, 2000);
        elBtn.innerText = 'stop!';
    } else {
        clearInterval(gChangeImgsInterval);
        elBtn.innerText = 'change images every 2 seconds';
    }
}
