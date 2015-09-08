Template.messageItem.helpers({
	image: function() {
		if(this.userId === Meteor.userId) {
			return this.recipPhoto;
		} else {
			return this.userPhoto;
		}
	},
	sender: function() {
		var sender = _.without(this.recipient, Meteor.user().username);
		return sender;
	}
});