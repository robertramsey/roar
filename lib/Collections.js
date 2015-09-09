var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Posts = new Mongo.Collection('posts');

Comments = new Mongo.Collection('comments');

Messages = new Mongo.Collection('messages');

Inbox = new Mongo.Collection('inboxNotifications');

Texts = new Mongo.Collection('texts');

Notifications = new Mongo.Collection('notifications');

Posts.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});


Comments.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

Messages.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

Texts.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

Notifications.allow({
  insert: function(userId, doc) {
    return !! userId;
  },
  update: function(userId, doc) {
    return !! userId;
  }
});

Inbox.allow({
  insert: function(userId, doc) {
    return !! userId;
  },
  update: function(userId, doc) {
    return !! userId;
  }
});

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});

