Template.userProfile.helpers({
	picture: function () {
		var params = Router.current().params.username;
		user = Meteor.users.findOne({username: params}, {fields: {"profile.picture": 1}});
		return user.profile.picture;
	},
	following: function () {
		var params = Router.current().params.username;
			following = Meteor.user().profile.following;
			a = following.indexOf(params);
		if(a === -1) {
			return "Follow";
		} else {
			return "Unfollow";
		}
	}
});