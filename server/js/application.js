if(Meteor.isServer) {
  Meteor.startup(function () {
    DJs = new Meteor.Collection("djs");

    if(DJs.find().count()) {
      DJs.insert({userID: 'randomid'});
    }

    Meteor.publish('djs', function() {
      return DJs.find();
    });

    DJs.allow({
      insert: function (userId, doc) {
        return true;
      }
    });
  });
}
