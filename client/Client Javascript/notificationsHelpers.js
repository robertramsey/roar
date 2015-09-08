Template.notifications.helpers({
  notificationCount: function () {
    return Notifications.find({recipient: Meteor.user().username, read: false}).count();
  },
  notifications: function () {
    return Notifications.find({recipient: Meteor.user().username});
  }
});