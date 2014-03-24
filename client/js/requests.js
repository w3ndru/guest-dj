if(Meteor.isClient) {
  Template.requests.rendered = function() {

  };

  Template.requests.tracks = function() {

  };

  Template.requests.events({
    'click .request-sorting a': function(e) {
      var $element = $(e.target);
      if($element.hasClass('active')) { return; }

      var method = $element.data('sort-method');
      Session.set('requestSortMethod', method);

      $('.request-sorting a').removeClass('active');
      $element.addClass('active');
    },

    // Clicking on dismiss button
    'click .dismiss': function(e) {
      var trackId = $(e.target).data('id');

      // When dismissed, set count to -2, it takes 3 requests to reactivate this track
      GD.requests.update(trackId, {$set: {count: -2}});
    }
  });

  Template.requests_details.requests = function() {
    var eventName = Session.get('currentEvent'),
        userId    = Meteor.userId();

    if(!eventName) { return; }

    var requests = GD.requests.find({userId: userId, event: eventName, count: {$gt: 0}}).fetch();
    requests.forEach(function(item, index) {
      // Calculate age of request in hours
      item.age = ((new Date() - item.requestTime) / 3600000).toFixed(1);

      // Calculate request priority by request age and request count
      // Age score: 1pt every 15 minutes, 4 pts to 1 hour
      item.priority = (item.age * 4) + (item.count * 1);
    });

    // Sorted by first request time naturally by db row insertion
    var sortMethod = Session.get('requestSortMethod');
    if(sortMethod == 'count') {
      requests.sort(function(a, b) { return a.count < b.count; });
    } else if (sortMethod == 'combo') {
      requests.sort(function(a, b) { return a.priority < b.priority; });
    } else {
      requests.sort(function(a, b) { return a.requestTime > b.requestTime; });
    }

    return requests;
  };

  Template.dismissed_tracks.dismissedTracks = function() {
    var eventName = Session.get('currentEvent'),
        userId    = Meteor.userId();

    if(!eventName) { return; }

    return GD.requests.find({userId: userId, event: eventName, count: {$lt: 1}}).fetch();
  };
}
