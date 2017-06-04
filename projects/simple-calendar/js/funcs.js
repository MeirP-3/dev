'use strict'


function addEvent(title, startDate, endDate, participants) {
    var newEvent = new Event(title, startDate, endDate, participants);
    var idxToPush = gEvents.findIndex(function (event) {
        return event.m_start > newEvent.m_start;
    });
    if (idxToPush === -1) {
        gEvents.push(newEvent);
    } else {
        gEvents.splice(idxToPush, 0, newEvent);
    }
}

//TODO: implement binary search and use it here
function findNextEvent() {
    var now = Date.now();
    var nextIdx = gEvents.findIndex(function (event) {
        return event.m_start > now;
    });
    return gEvents[nextIdx];
}

function isTheSamePerson(p1, p2) {
    return p1 === p2;
}

function getEventsCountFor(person) {
    return gEvents.reduce(function (counter, event) {
        if (event.isParticipant(person)) {
            counter++;
        }
        return counter;
    }, 0);
}

function getEventFromUser() {
    // show input fields
    addEvent(title.value, new Date(start.value), new Date(end.value), participants.value.split(' ,'));
}

function toggleInputsVisibility() {
    var elBtn = document.querySelectorAll('.btn-add-event');
    toggleElsVisibility(elBtn);
    var elInputs = document.querySelectorAll('.add-event');
    toggleElsVisibility(elInputs);
}

function showEvent(event) {

    var participants = event.m_participants.join(', ');

    var strHtml = '<div class="event-container">';
    strHtml += '<div class="event-row"><span>Title:</span>' + event.m_title + '</div>';
    strHtml += '<div class="event-row"><span>Start:</span>' + event.m_start + '</div>';
    strHtml += '<div class="event-row"><span>End:</span>' + event.m_end + '</div>';
    strHtml += '<div class="event-row"><span>Participants:</span>' + participants + '</div>';
    strHtml += '</div>';

    var elView = document.querySelector('.view-area');
    elView.innerHTML += strHtml;
}

function showNextEvent() {
    clearView();
    var nextEvent = findNextEvent();
    showEvent(nextEvent);
}

function showAllEvents() {
    clearView();
    gEvents.forEach(function (event) {
        showEvent(event);
    });
}

function clearView() {
    var elView = document.querySelector('.view-area');
    elView.innerHTML = '';
}

function countEventsPerPerson() {
    
    var eventsCount = getEventsCountFor(gPerson.value);
    var str = gPerson.value + ' participates in ' + eventsCount + ' events.';
    var elView = document.querySelector('.view-area');
    if (gPerson.value) {
        elView.innerHTML = str;
    }
}