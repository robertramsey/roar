Accounts.onCreateUser(function(options, user) {	
	if (options.profile)
    user.profile = options.profile;
	user.profile = {picture: "http://localhost:3000/img/default.png", following: []};
	return user;
});

Meteor.publish('messagesInbox', function (sessionId) {
	return [Messages.find({recieving: this.userId}), Texts.find({messageId: sessionId, recieving: this.userId})];
});

Meteor.publish('userprofile', function (id) {
	return Posts.find({associated: {$in: id}});
});

Meteor.publish('profile', function (username) {
	return [Posts.find({associated: username}), Meteor.users.find({username: username})];
});

Meteor.publish('favorites', function (username){
	return Posts.find({favoriters: username});
});

Meteor.publish('singlepost', function (_id) {
	return [Posts.find({_id: _id}), Comments.find({postId: _id})];
});

Meteor.publish('hashtags', function (hashtag) {
	return Posts.find({hashtags: hashtag});
});

Meteor.publish('notifications', function () {
	return Notifications.find({recipient: this.userId});
});

Meteor.publish('inboxNotifications', function () {
	return Inbox.find({recipient: this.userId});
});

Meteor.publish('users', function () {
	return Meteor.users.find();
});

