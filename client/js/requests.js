if(Meteor.isClient) {
  Template.requests.playlistName = function() {
  };

  Template.requests.tracks = function() {

  };

  Template.requests.events({
    'click ul li button': function(e) {

    }
  });

  Template.requests_details.requests = function() {
    var eventName = Session.get('currentEvent'),
        userId    = Meteor.userId();

    if(!eventName) { return; }

    return GD.requests.find({userId: userId, event: eventName}).fetch();
  };
}
