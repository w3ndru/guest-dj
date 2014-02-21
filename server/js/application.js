if(Meteor.isServer) {
  Meteor.startup(function () {
    DJs = new Meteor.Collection("djs"); // {_id, userID}
    Events = new Meteor.Collection('events'); // {_id, name, playlistId}
    Playlists = new Meteor.Collection('playlists'); // {_id, userId, even, tracks}, track: [{artist, title}]
    Profiles = new Meteor.Collection('profiles');
    Requests = new Meteor.Collection('requests');

    Meteor.publish('djs', function() { return DJs.find(); });
    Meteor.publish('events', function() { return Events.find(); });
    Meteor.publish('playlists', function() { return Playlists.find(); });
    Meteor.publish('profiles', function() { return Profiles.find(); });
    Meteor.publish('requests', function() { return Requests.find(); });

    DJs.allow({
      insert: function (userId, doc) { return true; },
      remove: function (userId, doc) { return true; },
      fetch: ['owner']
    });

    Events.allow({
      insert: function (userId, doc) { return true; },
      remove: function (userId, doc) { return true; },
      fetch: ['owner']
    });

    Playlists.allow({
      insert: function (userId, doc) { return true; },
      remove: function (userId, doc) { return true; },
      fetch: ['owner']
    });

    Profiles.allow({
      insert: function (userId, doc) { return true; },
      remove: function (userId, doc) { return true; },
      fetch: ['owner']
    });

    Requests.allow({
      insert: function (userId, doc) { return true; },
      remove: function (userId, doc) { return true; },
      fetch: ['owner']
    });

  });
}
