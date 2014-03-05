if(Meteor.isClient) {
  Template.requests.playlistName = function() {
  };

  Template.requests.tracks = function() {

  };

  Template.requests.events({
    'click ul li button': function(e) {
      debugger
    }
  });

  Template.requests_details.requests = function() {
    var eventName = Session.get('currentEvent'),
        userId    = Meteor.userId();

    if(!eventName) { return; }

    var requests = GD.requests.find({userId: userId, event: eventName}).fetch();

    requests.forEach(function(item, index) {
      item.age = ((new Date() - item.requestTime) / 3600000).toFixed(1);
    });

    return requests;
  };
}
