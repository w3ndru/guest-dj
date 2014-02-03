if(Meteor.isClient) {
  Session.set('currentSection', 'home');
  Template.dj_view.addDialog = false;
  Template.dj_view.playListFile = null;

  Template.dj_view.events({
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
        var html = '';
        var data = [];

        if(text[1].indexOf('EXTM3U') < 0) { return; }
        
        for(var i = 1; i < text.length - 1; i++) {
          var info = text[i].trim();

          if(info.indexOf('EXTINF') === 0) {
            var details = /^EXTINF:\d+,(.+)/.exec(info)[1];
            var artist =  details.split(' - ')[1];
            var title = details.split(' - ')[0];
            
            data.push({artist: artist, title: title});
            html += '<li>' + artist + ' - ' + title + '</li>';
          }
        }

        $('ul.playlist').html(html);
        Template.dj_view.playListFile = data;
        $('button.save').removeClass('hide');
      };
    },

    'click .dj-nav a': function(e) {
      if($(e.target).hasClass('active')) { return; }

      $('.dj-nav a').removeClass('active');
      $(e.target).addClass('active');

      Session.set('currentSection', $(e.target).data('section'));
    }

  });

}
