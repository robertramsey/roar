Template.inboxNotificationItem.events({
  'click a': function() {
    Inbox.update(this._id, {$set: {read: true}});
  }
});