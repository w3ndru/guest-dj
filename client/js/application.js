if(Meteor.isClient) {
  Meteor.startup(function() {
    Session.set('currentSection', 'home');
    Session.set('currentEvent', null);
  });

  DJs = new Meteor.Collection("djs");
  Meteor.subscribe("djs");

	Template.application.isDJ = function() {
    var result = DJs.find({userID: Meteor.userId()}).fetch();
		return !!result.length;
	};
}

Meteor.Router.add({

});
