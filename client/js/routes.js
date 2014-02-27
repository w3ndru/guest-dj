Meteor.Router.add({
  '/home': function() {
    Session.set('currentSection', 'home');
    return 'application';
  },

  '/events': function() {
    Session.set('currentSection', 'events');
    return 'application';
  },

  '/requests': function() {
    Session.set('currentSection', 'requests');
    return 'application';
  },

  '/settings': function() {
    Session.set('currentSection', 'settings');
    return 'application';
  },

  '/playlist/:id': function(id) {
    GD.displayListId = id;
    return 'playlist';
  },

  '*': function() {
    Session.set('currentSection', 'home');
    return 'application';
  }
});
