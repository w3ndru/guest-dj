if(Meteor.isClient) {
  Events = new Meteor.Collection('events');
  Playlists = new Meteor.Collection('playlists');
  Meteor.subscribe("events");
  Meteor.subscribe("playlists");

  Template.dj_events.titleText = function() {
    return Session.get('currentEvent') || 'Select or create new event';
  };

  Template.dj_events.eventList = function() {
    return Events.find({userId: Meteor.userId()}).fetch();
  };

  Template.dj_events.events({
    'click #create-event-btn': function(e) {
      var input = $('.event-list #new-even-name');
      var eventName = input.val();

      if(!eventName) { return; }

      Events.insert({userId: Meteor.userId(), name: eventName, playListId: null});
      Session.set('currentEvent', eventName);
      input.val('');
    },

    'change .event-list select': function(e) {
      var option = $(e.target.selectedOptions);
      var eventName = option.val();

      if(eventName == '--') {
        Session.set('currentEvent', null);
      } else {
        Session.set('currentEvent', eventName);
      }
    }
  });

  Template.dj_playlist.hasPlaylist = function() {
    // debugger
  };

  Template.dj_playlist.eventSelected = function() {
    return !!Session.get('currentEvent');
  };

  Template.dj_playlist.eventName = function() {
    return Session.get('currentEvent');
  };
}
