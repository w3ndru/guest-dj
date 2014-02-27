if(Meteor.isClient) {
  Template.playlist.playlistName = function() {
    var id = GD.displayListId;
    var list = GD.playlists.find({_id: id}).fetch();

    Session.set('currentPlaylist', list[0]);
    return list[0] && list[0].event;
  };

  Template.playlist.tracks = function() {
    var list = Session.get('currentPlaylist');
    return list && list.tracks;
  };

  Template.playlist.events({
    'click ul li button': function(e) {
      var list = Session.get('currentPlaylist');
      var artist = $(e.target).data('artist');
      var title = $(e.target).data('title');
      var userId = list.userId;
      var eventName = list.event;

      var result = GD.requests.find({title: title, artist: artist, played: false}).fetch();

      if(!!result.length) {
        GD.requests.update(result[0]._id, {$inc: {count: 1}});
      } else {
        GD.requests.insert({userId: userId, title: title, artist: artist, requestTime: new Date(), count: 1, played: false});
      }

      $(e.target).hide();
    }
  });
}
