Template.textitem.helpers({
  side: function () {
    var username = this.username;
    var currentUser = Meteor.user().username;
    if(username === currentUser) {
      return "left";
    } else {
      return "right"
    }
  }
});