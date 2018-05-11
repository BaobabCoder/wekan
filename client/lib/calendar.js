Calendar = {

  getCards(start, end) {
    return Cards.find({boardId:Session.get('currentBoard')});
  },
  mapEvents(eventCursor) {
    let eventArray = [];
    eventCursor.forEach((card) => {
        var title = card.title;
        var date = card.startAt.toISOString();
        var event = {
            id: card._id,
            title: title,
            // color: card.color,
            start: date,
            end: moment(date).add(1, 'hours').toISOString(),
            description: card.description,
        };
        eventArray.push(event);
    });
    return eventArray;
  },
};

Blaze.registerHelper('Filter', Calendar);
