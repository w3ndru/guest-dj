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
        var text = this.result.split('\n');
        var html = '';
        
        for(var i = 0; i < text.length - 1; i++) {
          var data = text[i].trim();
          if(data[0] == '#') { continue; }

          html += '<li>' + data + '</li>';
        }

        $('ul.playlist').html(html);
        Template.dj_view.playListFile = text;
        debugger
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
