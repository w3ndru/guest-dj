if(Meteor.isClient) {
  DJs = new Meteor.Collection("djs");
  Meteor.subscribe("djs");

	Template.application.isDJ = function() {
    var userID = Meteor.user()._id;
    var result = DJs.find({userID: userID}).fetch();
		return !!result.length;
	};
}
