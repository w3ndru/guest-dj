if(Meteor.isClient) {
  GD = new Object({
    djs: new Meteor.Collection("djs"),
    events: new Meteor.Collection('events'),
    playlists: new Meteor.Collection('playlists')
  });

  Meteor.subscribe("djs");
  Meteor.subscribe("events");
  Meteor.subscribe("playlists");

  Meteor.startup(function() {
    Session.set('currentSection', 'home');
    Session.set('currentEvent', null);
  });

  Template.application.isDJ = function() {
    var result = GD.djs.find({userID: Meteor.userId()}).fetch();
    return !!result.length;
  };
}

Meteor.Router.add({

});
