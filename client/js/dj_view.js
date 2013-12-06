if(Meteor.isClient) {
  Template.dj_events.eventList = function() {
    if(Meteor.user()) {
      return [];
    } else {
      return [];
    }
  };

  Template.dj_events.events({

  });

  Template.dj_view.userName = function() {
    return "rockMyWorld";
  };

  Template.dj_view.addDialog = false;

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
        
        for(var i = 1; i < text.length - 1; i++) {
          html += '<li>' + text[i] + '</li>';
        }

        $('ul.playlist').html(html);
        Template.dj_view.playListFile = text;
        $('button.save').removeClass('hide');
      };
    }

  });

}
