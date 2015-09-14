Template.postPage.events({
	'click .commentSubmit': function(e) {
    e.preventDefault();
    var cdContent = $('.' + this._id).html();
    var reply = {
      comment: cdContent,
      postId: this._id,
      recipient: this.username
    };
    Meteor.call('reply', reply);
    $('.' + this._id).html("");
  },
});