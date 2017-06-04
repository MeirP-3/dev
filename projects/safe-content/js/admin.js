'use strict';

function renderUserDetails() {
    if (!isAdminLogged()) {
        window.location = 'index.html';
        return;
    }
    
    if (localStorage.getItem('tableView')) {
        renderUsersTable();
    } else {
        var elBtns = document.querySelectorAll('.view > span');
        toggleElsVisibility(elBtns);
        renderUserCards();
    }
}

function renderUserCards() {

    var users = getUsers();
    var elContainer = document.createElement('div');
    elContainer.classList.add('cards-container');

    for (var i = 0; i < users.length; i++) {
        var elCard = document.createElement('div');
        elCard.classList.add('card');
        for (var key in users[i]) {
            var elDetails = document.createElement('div');
            elDetails.classList.add('details');
            var elKey = document.createElement('span');
            elKey.classList.add('key-details');
            elKey.innerText = key + ': ';
            var elContent = document.createElement('span');
            elContent.classList.add('content-details');
            if (key === 'lastLogin' && users[i].lastLogin) {
                var time = users[i].lastLogin.toLocaleString();
                elContent.innerText = time;
            } else {
                elContent.innerText = users[i][key];
            }
            elDetails.appendChild(elKey);
            elDetails.appendChild(elContent);
            elCard.appendChild(elDetails);
        }
        elContainer.appendChild(elCard);
    }
    document.querySelector('.user-details').appendChild(elContainer);
}

function renderUsersTable() {

    var users = getUsers();
    var elTable = document.createElement('table');
    var elTr = document.createElement('tr');
    var keys = Object.keys(users[0]);

    for (var i = 0; i < keys.length; i++) {
        var elTh = document.createElement('th');
        elTh.innerText = keys[i];
        elTr.appendChild(elTh);
    }

    elTable.appendChild(elTr);
    for (i = 0; i < users.length; i++) {
        elTr = document.createElement('tr')
        for (var j = 0; j < keys.length; j++) {
            var elTd = document.createElement('td');
            if (keys[j] === 'lastLogin' && users[i].lastLogin) {
                var time = users[i].lastLogin.toLocaleString();
                elTd.innerText = time;
            } else {
                elTd.innerText = users[i][keys[j]];
            }
            elTr.appendChild(elTd);
        }
        elTable.appendChild(elTr);
    }
    document.querySelector('.user-details').appendChild(elTable);
}

function logoutAdmin() {
    logout();
    window.location = 'index.html';
}

function toggleView() {
    var elBtns = document.querySelectorAll('.view > span');
    toggleElsVisibility(elBtns);

    if (localStorage.getItem('tableView')) {

        var elBox = document.querySelector('.user-details');
        var elTable = elBox.querySelector('table');
        elBox.removeChild(elTable);

        renderUserCards();
        localStorage.setItem('tableView', '');

    } else {

        var elBox = document.querySelector('.user-details');
        var elCards = elBox.querySelector('.cards-container');
        elBox.removeChild(elCards);

        renderUsersTable();
        localStorage.setItem('tableView', 'yes');
    }
}