if(Meteor.isClient) {
  Template.dj_events.rendered = function() {
    var eventName = Session.get('currentEvent');

    if(eventName) {
      $('.event-list select option').filter(function() {
        return $(this).text() == eventName;
      }).prop('selected', true);
    }
  };

  Template.dj_events.titleText = function() {
    return Session.get('currentEvent') || 'Select or create new event';
  };

  Template.dj_events.eventList = function() {
    return GD.events.find({userId: Meteor.userId()}).fetch();
  };

  Template.dj_events.canDeleteEvent = function() {
    return !!Session.get('currentEvent') && Session.get('currentSection') == 'events';
  };

  Template.dj_events.events({
    'click #create-event-btn': function(e) {
      var input = $('.event-list #new-even-name');
      var eventName = input.val();

      if(!eventName) { return; }

      GD.events.insert({userId: Meteor.userId(), name: eventName, playListId: null});
      Session.set('currentEvent', eventName);
      Session.set('currentPlaylist', null);
      input.val('');
    },

    'change .event-list select': function(e) {
      var option = $(e.target.selectedOptions);
      var eventName = option.val();

      Session.set('uploadTracks', null);

      if(eventName == '--') {
        Session.set('currentEvent', null);
        Session.set('currentPlaylist', null);
        $('ul.playlist').html('');
      } else {
        Session.set('currentEvent', eventName);
        var list = GD.playlists.find({userId: Meteor.userId(), event: Session.get('currentEvent')}).fetch();
        Session.set('currentPlaylist', list[0]);
      }
    },

    'click .delete': function() {
      var eventRecord = GD.events.findOne({name: Session.get('currentEvent'), userId: Meteor.userId()});

      GD.events.remove(eventRecord._id);
      Session.set('currentEvent', null);
      Session.set('currentPlaylist', null);

      if(eventRecord.playListId) {
        GD.playlists.remove(eventRecord.playListId);
      }
    }
  });

  Template.dj_playlist.hasPlaylist = function() {
    var list = Session.get('currentPlaylist');

    if(!list) { return false; }

    var html = '';

    list.tracks.forEach(function(item) {
      html += '<li class="transition-all">' +
                  '<span class="artist truncate">' + item.artist + '</span>' +
                  '<span class="title truncate">' + item.title + '</span>' +
                  '<span class="remove">' +
                    '<button class="btn btn-small btn-inverse">Remove track</button>' +
                  '</span>' +
                '</li>';
    });

    $('ul.playlist').html(html);
    return !!list;
  };

  Template.dj_playlist.eventSelected = function() {
    return !!Session.get('currentEvent');
  };

  Template.dj_playlist.eventName = function() {
    return Session.get('currentEvent');
  };

  Template.dj_upload_playlist.events({
    'dragover .drop-zone' : function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },

    'drop .drop-zone' : function(e) {
      e.stopPropagation();
      e.preventDefault();

      if (!window.File || !window.FileReader || !window.FileList || !window.Blob) { return; }
      var f = e.dataTransfer.files[0];
      var reader = new FileReader();
      reader.readAsText(f);

      reader.onload = function() {
        var text = this.result.split('#');
        var data = [];

        if(text[1].indexOf('EXTM3U') < 0) { return; }

        for(var i = 1; i < text.length - 1; i++) {
          var info = text[i].trim();

          if(info.indexOf('EXTINF') === 0) {
            var details = /^EXTINF:\d+,(.+)/.exec(info)[1];
            var artist =  details.split(' - ')[1];
            var title = details.split(' - ')[0];

            data.push({artist: artist, title: title});
          }
        }

        Template.dj_view.playListFile = data;
        Session.set('uploadTracks', data);
        $('button.save').removeClass('hide');
      };
    },

    'click button.btn-inverse.save': function(e) {
      var eventName = Session.get('currentEvent');
      var userId = Meteor.userId();
      var playlist = Template.dj_view.playListFile;

      GD.playlists.insert({userId: userId, 'event': eventName, tracks: playlist});
      Session.set('uploadTracks', null);
    }
  });

  Template.playlist_details.tracks = function() {
    var tracksToBeUploaded = Session.get('uploadTracks'),
        playlistTracks     = Session.get('currentPlaylist') && Session.get('currentPlaylist').tracks;

    return tracksToBeUploaded || playlistTracks;
  };

  Template.playlist_details.events({
    'click .playlist .remove button': function(e) {
      var artist = $(e.target).parent().siblings('.artist').text();
      var title = $(e.target).parent().siblings('.title').text();

      if (window.confirm('Remove ' + title + '?')) {
        var currentPlaylist = Session.get('currentPlaylist');
        var tracks = currentPlaylist.tracks;

        for(var i = 0; i < tracks.length; i++) {
          if(tracks[i].artist == artist && tracks[i].title == title) {
            tracks.splice(i, 1);
            break;
          }
        }

        currentPlaylist.tracks = tracks;
        Session.set('currentPlaylist', currentPlaylist);
        GD.playlists.update(currentPlaylist._id,
                            {$set: {tracks: tracks}}
                            );
      }
    }
  });

  Template.publish_info.showInfo = function() {
    return !!Session.get('currentPlaylist');
  };
}
