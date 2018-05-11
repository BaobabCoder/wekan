import { fullCalendar } from 'fullcalendar';

BlazeComponent.extendComponent({
  onRendered() {
    let $calendar = this.$('.calendar');
    Tracker.autorun(() => {

      $calendar.fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek'
        },
        timeFormat: 'HH',
        defaultView: 'month',
        editable: false,
        selectable: false,
        height: 'parent',
        // aspectRatio: 2.5,
        events: function(start, end, tz, callback) {
            let cards = Calendar.getCards(start.toDate(), end.toDate());
            let events = Calendar.mapEvents(cards);
            if (events) {
                callback(events);
            }
        },
        timezone: 'local',
        ignoreTimezone: false,
        // eventClick: ModalHelper.openEventModal,
        // select: ModalHelper.openEmptyEventModal,
        // eventDrop: eventDateChanged,
        // eventResize: eventDateChanged,
      });
      var view = $calendar.fullCalendar('getView');
      Meteor.subscribe('board', Session.get('currentBoard'), () => {
          $calendar.fullCalendar('refetchEvents');
      });
      $calendar.fullCalendar('refetchEvents');
    });
  },
}).register('calendar');
