if(Meteor.isClient) {
  Template.dj_events.titleText = function() {
    return Session.get('currentEvent') || 'Select or create new event';
  };

  Template.dj_events.eventList = function() {
    return GD.events.find({userId: Meteor.userId()}).fetch();
  };

  Template.dj_events.events({
    'click #create-event-btn': function(e) {
      var input = $('.event-list #new-even-name');
      var eventName = input.val();

      if(!eventName) { return; }

      GD.events.insert({userId: Meteor.userId(), name: eventName, playListId: null});
      Session.set('currentEvent', eventName);
      input.val('');
    },

    'change .event-list select': function(e) {
      var option = $(e.target.selectedOptions);
      var eventName = option.val();

      if(eventName == '--') {
        Session.set('currentEvent', null);
        Session.set('currentPlaylist', null);
      } else {
        Session.set('currentEvent', eventName);
        var list = GD.playlists.find({userId: Meteor.userId(), event: Session.get('currentEvent')}).fetch();
        Session.set('currentPlaylist', list[0]);
      }
    }
  });

  Template.dj_playlist.hasPlaylist = function() {
    var list = Session.get('currentPlaylist');

    if(!list) { return false; }

    var html = '';

    list.tracks.forEach(function(item) {
      html += '<li>' + item.artist + ' - ' + item.title + '</li>';
    });

    $('ul.playlist').html(html);
    return !!list;
  };

  Template.dj_playlist.eventSelected = function() {
    return !!Session.get('currentEvent');
  };

  Template.dj_playlist.eventName = function() {
    return Session.get('currentEvent');
  };

  Template.dj_upload_playlist.events({
    'click button.btn-inverse.save': function(e) {
      var eventName = Session.get('currentEvent');
      var userId = Meteor.userId();
      var playlist = Template.dj_view.playListFile;

      GD.playlists.insert({userId: userId, 'event': eventName, tracks: playlist});
    }
  });
}
