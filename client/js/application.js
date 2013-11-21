if(Meteor.isClient) {
	Template.application.isDJ = function() {
    // debugger
		return true;
	};
}

if(Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
