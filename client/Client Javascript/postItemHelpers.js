Template.postItem.helpers({
  repostThere: function () {
    var followers = Meteor.user().profile.following;
    var associated = this.associated;
    var userprofile = Meteor.users.findOne();
    var username = this.username;
    var crossover = _.intersection(followers, associated);
    if (crossover[0] === username) {
      return false;
    } else if (Router.current().params.username) { 
      return false;
    } else {
      return true;
    };
  
  },
  reposter: function () {
    var followers = Meteor.user().profile.following;
    var associated = this.associated;
    var crossover = _.intersection(followers, associated);
    return crossover[0];
  },
  ownPost: function () {
    if (this.username === Meteor.user().username) {
      return true
    } else {
      return false
    }
  }
      
});