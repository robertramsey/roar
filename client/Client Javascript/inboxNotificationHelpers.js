Template.inboxNotifications.helpers({
  inboxCount: function () {
    return Inbox.find({recipient: Meteor.user()._id, read: false}).count();
  },
  inboxNotifications: function () {
    return Inbox.find({recipient: Meteor.user()._id});
  }
});