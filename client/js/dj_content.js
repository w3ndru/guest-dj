if(Meteor.isClient) {
  Template.dj_content.currentSectionIs = function(name) {
    return name == Session.get('currentSection');
  };
}
