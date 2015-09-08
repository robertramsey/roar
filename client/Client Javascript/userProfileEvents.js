Template.userProfile.events({
  'click .Follow': function(e, template) {
    e.preventDefault();
    var user = Router.current().params.username;
    Meteor.call('follow', user);
  },
  'click .Unfollow': function (e) {
  	e.preventDefault();
    var user = Router.current().params.username;
    Meteor.call('unfollow', user);
  }
});