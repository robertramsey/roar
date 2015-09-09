Template.postsList.helpers({
	image: function () {
		return Meteor.user().profile.picture;
	}
});