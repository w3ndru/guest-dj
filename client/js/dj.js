if(Meteor.isClient) {
  Session.set('currentSection', 'home');
  Template.dj_view.addDialog = false;
  Template.dj_view.playListFile = null;

  Template.dj_view.events({
    'click .dj-nav a': function(e) {
      if($(e.target).hasClass('active')) { return; }

      var section = $(e.target).data('section');
      $('.dj-nav a').removeClass('active');
      $(e.target).addClass('active');

      Meteor.Router.to('/' + section);
    }

  });

  Template.dj_nav.rendered = function() {
    var section = Session.get('currentSection');
    $('nav .tab').removeClass('active');
    $('nav .tab#dj-nav-' + section).addClass('active');
  };

  Template.dj_content.currentSectionIs = function(name) {
    return name == Session.get('currentSection');
  };

}
