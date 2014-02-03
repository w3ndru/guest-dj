if(Meteor.isServer) {
  Meteor.startup(function () {
    DJs = new Meteor.Collection("djs");
    Events = new Meteor.Collection('events');
    Playlists = new Meteor.Collection('playlists');

    Meteor.publish('djs', function() { return DJs.find(); });
    Meteor.publish('events', function() { return Events.find(); });
    Meteor.publish('playlists', function() { return Playlists.find(); });

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
    })

  });
}
