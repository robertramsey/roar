Template.postPage.helpers({
	posts: function() {
		return Posts.find();
	},
	comments: function() {
		return Comments.find();
	}
})