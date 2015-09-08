Accounts.onCreateUser(function(options, user) {
	
	if (options.profile)
    user.profile = options.profile;
	user.profile = {picture: "img/default.jpg", following: []};
	return user;
});


Meteor.publish('messaging', function () {
	return Meteor.users.find();
});


// Build out composite for this
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

Meteor.publish('tweets', function (_id) {
	return Posts.find({_id: _id});
});

//For the hashtags page
Meteor.publish('hashtags', function (hashtag) {
	return Posts.find({hashtags: hashtag});
});

//Notifications for specific user
Meteor.publish('notifications', function () {
	return Notifications.find({recipient: this.userId});
});

Meteor.publish('inboxNotifications', function () {
	return Inbox.find({recipient: this.userId});
});
