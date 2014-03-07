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
    }

    return requests;
  };
}
