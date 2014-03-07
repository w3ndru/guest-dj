if(Meteor.isClient) {
  GD = new Object({
    djs: new Meteor.Collection('djs'),
    events: new Meteor.Collection('events'),
    playlists: new Meteor.Collection('playlists'),
    profiles: new Meteor.Collection('profiles'),
    requests: new Meteor.Collection('requests'),

    currentPlaylistUrl: function() {
      var playlist = Session.get('currentPlaylist');
      if(!playlist) { return ''; }
      return window.location.origin + '/playlist/' + playlist._id;
    },

    currentPlaylistQRUrl: function() {
      var playlist = Session.get('currentPlaylist');
      if(!playlist) { return ''; }
      return 'https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=' +
              window.location.origin + '/playlist/' + playlist._id;
    }
  });

  Meteor.subscribe('djs');
  Meteor.subscribe('events');
  Meteor.subscribe('playlists');
  Meteor.subscribe('profiles');
  Meteor.subscribe('requests');

  Meteor.startup(function() {
    Session.set('currentEvent', null);
    Session.set('currentPlaylist', null);
    Session.set('uploadTracks', null);
    Session.set('requestSortMethod', 'time'); // time, count, combo
  });

  Template.application.isDJ = function() {
    var result = GD.djs.find({userID: Meteor.userId()}).fetch();
    return !!result.length;
  };
}
