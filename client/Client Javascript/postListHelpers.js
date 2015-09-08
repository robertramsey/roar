Template.postsList.helpers({
	image: function () {
		var picture = Meteor.user().profile.picture.image;
		var initial = "img/default.jpg"
		if (picture !== undefined) {
			return picture;
		} else {
			return initial
		}
	}
})