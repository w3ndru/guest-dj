if(Meteor.isClient) {
  Template.playlist.playlistName = function() {
    var id = GD.displayListId;
    var list = GD.playlists.find({_id: id}).fetch();

    Session.set('currentPlaylist', list[0]);
    return list[0] && list[0].event;
  };

  Template.user_playlist.tracks = function() {
    var list       = Session.get('currentPlaylist'),
        sortMethod = Session.get('playlistSortMethod');

    if(sortMethod && list) {
      if(sortMethod == 'artist') {
        list.tracks.sort(function(a, b) { return a.artist > b.artist; });
      } else if(sortMethod == 'title') {
        list.tracks.sort(function(a, b) { return a.title > b.title; });
      }
    }

    return list && list.tracks;
  };

  Template.playlist.events({
    // Clicking on request button
    'click ul li button': function(e) {
      var list      = Session.get('currentPlaylist'),
          artist    = $(e.target).data('artist'),
          title     = $(e.target).data('title'),
          userId    = list.userId,
          eventName = list.event;

      var result = GD.requests.find({title: title,
                                      artist: artist,
                                      event: eventName
                                    }).fetch();

      if(!!result.length) {
        // Increment when record found
        GD.requests.update(result[0]._id,
                            {$inc: {count: 1}}
                          );
      } else {
        // Insert request if no record for track
        GD.requests.insert({userId: userId,
                            title: title,
                            artist: artist,
                            event: eventName,
                            requestTime: new Date(),
                            count: 1,
                            played: false
                          });
      }

      $(e.target).hide();
    },

    // Clicking on sorting options
    'click .playlist-sorting .sort-tab': function(e) {
      var method        = $(e.target).data('sort-method'),
          currentMethod = Session.get('playlistSortMethod');

      $('.playlist-sorting .sort-tab').removeClass('active');

      if(method == currentMethod) {
        Session.set('playlistSortMethod', null);
      } else {
        Session.set('playlistSortMethod', method);
        $(e.target).addClass('active');
      }
    }
  });
}
