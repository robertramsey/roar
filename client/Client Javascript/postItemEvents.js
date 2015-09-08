Template.postItem.events({
  'click .favorite': function(e) {
   e.preventDefault();
   var favorite = {
    postId: this._id,
    username: this.username
   };
   Meteor.call('favorite', favorite);
  },
  'click .repost': function(e) {
    e.preventDefault();
    var repost = {
    postId: this._id,
    username: this.userId
   };
    Meteor.call('repost', repost);
  },
  'click .commentSubmit': function(e) {
    e.preventDefault();
    var cdContent = $('.' + this._id).html();
    console.log(cdContent);
    var reply = {
      comment: cdContent,
      postId: this._id,
      recipient: this.username
    };
    Meteor.call('reply', reply);
    $('.' + this._id).html("");
  },
  'click .delete': function(e) {
    e.preventDefault();
    var deletion = {
      username: this.userId,
      _id: this._id}
    Meteor.call('delete', deletion);
  }
});