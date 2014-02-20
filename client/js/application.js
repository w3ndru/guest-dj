if(Meteor.isClient) {
  GD = new Object({
    djs: new Meteor.Collection("djs"),
    events: new Meteor.Collection('events'),
    playlists: new Meteor.Collection('playlists'),
    currentPlaylistUrl: function() {
      var playlist = Session.get('currentPlaylist');

      if(!playlist) { return ''; }

      return window.location.origin +
              '/playlist/' +
              playlist._id;
    },
    currentPlaylistQRUrl: function() {
      var playlist = Session.get('currentPlaylist');
      if(!playlist) { return ''; }
      return "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
              window.location.origin +
              '/playlist/' +
              playlist._id;
    }
  });

  Meteor.subscribe("djs");
  Meteor.subscribe("events");
  Meteor.subscribe("playlists");

  Meteor.startup(function() {
    Session.set('currentEvent', null);
  });

  Template.application.isDJ = function() {
    var result = GD.djs.find({userID: Meteor.userId()}).fetch();
    return !!result.length;
  };
}

Meteor.Router.add({
  '/home': function() {
    Session.set('currentSection', 'home');
    return 'application';
  },

  '/events': function() {
    Session.set('currentSection', 'events');
    return 'application';
  },

  '/playlist/:id': function(id) {
    GD.displayListId = id;
    return 'playlist';
  }
});
