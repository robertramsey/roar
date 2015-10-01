Template.textitem.helpers({
  side: function () {
    var username = this.username;
    var currentUser = Meteor.user().username;
    if(username === currentUser) {
      return "left";
    } else {
      return "right"
    }
  },
  color: function () {
    var username = this.username;
    var currentUser = Meteor.user().username;
    if(username === currentUser) {
      return "#377bb5";
    } else {
      return "#008b34"
    }
  }
});