'use strict'

function Event(i_title, i_start, i_end, i_participants) {
    this.m_title = i_title;
    this.m_start = i_start;
    this.m_end = i_end;
    this.m_participants = i_participants;
}

Event.prototype.isParticipant = function(person) {
    return this.m_participants.some(function(participant) {
        return isTheSamePerson(participant, person);
    });
}
