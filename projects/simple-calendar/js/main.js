var gEvents = [];
addEvent('fourth day', new Date(2017, 3, 26, 8, 30), new Date(2017, 4, 26, 17, 30), ['kuki', 'popo', 'momo', 'puki', 'muki']);

addEvent('Third Day', new Date(2017, 3, 25, 8, 30), new Date(2017, 4, 25, 17, 30), ['bobo', 'popo', 'momo', 'baba', 'puki', 'muki']);

addEvent('Second Day', new Date(2017, 3, 24, 8, 30), new Date(2017, 4, 24, 17, 30), ['popo', 'momo', 'baba', 'puki', 'muki', 'buki', 'david']);

addEvent('First Day', new Date(2017, 3, 23, 8, 30), new Date(2017, 4, 23, 17, 30), ['popo', 'momo', 'baba', 'puki', 'muki']);

var nextEventDate = new Date();
nextEventDate.setDate(nextEventDate.getDate() + 5);

var nextEventEndDate = new Date();
nextEventEndDate.setDate(nextEventEndDate.getDate() + 5);

addEvent('far in the future', nextEventDate, nextEventEndDate, ['kuki', 'popo', 'momo', 'baba', 'puki', 'muki']);

var nextEventDate = new Date();
nextEventDate.setDate(nextEventDate.getDate() + 1);

var nextEventEndDate = new Date();
nextEventEndDate.setDate(nextEventEndDate.getDate() + 1);

addEvent('in the near future', nextEventDate, nextEventEndDate, ['kuki', 'popo', 'momo', 'baba', 'puki', 'muki']);

