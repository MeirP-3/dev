'use strict';
// CR highlights: 
//  * better use in local storage 'isAdmin' to represent admin or not,
//    and isLogged to represent if any user is logged.
//  * toggle is not good for view types, sometimes there are more than 2.  
//  * handling object's props needs to be specific, not in a loop.  


// var gUsers = [
//     {
//         username: 'popo',
//         password: '1',
//         lastLogin: null,
//         isAdmin: true        
//     },
//     {
//         username: 'baba',
//         password: '1',
//         lastLogin: null,
//         isAdmin: false        
//     },
//     {
//         username: 'puki',
//         password: '3',
//         lastLogin: null,
//         isAdmin: false
//     }
// ];

function saveUsers(users) {
    localStorage.setItem('gUsers', JSON.stringify(users));
}

function getUsers() {
    var users = JSON.parse(localStorage.getItem('gUsers'));
    return users;
}

function login() {
    var user = {};
    user.username = prompt('enter username:');
    user.password = prompt('enter password');
    return user;
}

function checkUser(currUser, users) {
    var userIdx = users.findIndex(function (user) {
        return user.username === currUser.username && user.password === currUser.password;
    });
    return userIdx;
}

function isAdminLogged() {
    return localStorage.getItem('userIsAdmin');
}

function isRegularUserLogged() {
    return localStorage.getItem('userIsNotAdmin');
}

function checkProtectionLevel() {
    if (isRegularUserLogged()) {
        toggleVisibility();
    } else if (isAdminLogged()) {
        toggleVisibility(true);
    }
}

function connectUser() {

    var currUser = login();
    var users = getUsers();
    var userIdx = checkUser(currUser, users);

    if (userIdx === -1) return;

    var time = new Date();
    users[userIdx].lastLogin = time;
    saveUsers(users);

    var isAdmin = false;
    if (users[userIdx].isAdmin) {
        isAdmin = true;
        localStorage.setItem('userIsAdmin', 'yes');
    } else {
        localStorage.setItem('userIsNotAdmin', 'yes');
    }
    toggleVisibility(isAdmin);
}

function logout() {
    var isAdmin = localStorage.getItem('userIsAdmin');
        localStorage.setItem('userIsAdmin', '');
        localStorage.setItem('userIsNotAdmin', '');
    toggleVisibility(isAdmin);
}

function toggleVisibility(isAdmin) {
    var els;
    if (isAdmin) {
        els = document.querySelectorAll('.protected-admin');
        toggleElsVisibility(els);
    }
    els = document.querySelectorAll('.protected');
    toggleElsVisibility(els);
    els = document.querySelectorAll('.default');
    toggleElsVisibility(els);
}

function toggleElsVisibility(els) {
    els.forEach(function (el) {
        el.classList.toggle('hidden')
    });
}
