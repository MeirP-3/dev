'use strict';
function toggleElementVisibility(selector) {
    var el = document.querySelector(selector);
    
    if (el) {

        el.style.display = (el.style.display === 'none') ? 'initial' : 'none';

    } else console.error(this, 'could not find', selector);

}