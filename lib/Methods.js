
createNotification = function (url, type, recipient) {
  var user = Meteor.user();
  Notifications.insert({
    url: url,
    type: type,
    recipient: recipient,
    username: user.username,
    submitted: new Date(),
    read: false
  });
}

createInboxNotification = function (url, type, recipient) {
  var user = Meteor.user();
  var notificationExists = Inbox.findOne({url: url});
  if(notificationExists) {
    var notificationAttributes = {
      type: type,
      read: false
    };
    Inbox.update({url: url}, {$set: notificationAttributes}); 
  } else {
  Inbox.insert({
    url: url,
    type: type,
    recipient: recipient,
    username: user.username,
    submitted: new Date(),
    read: false
  });
  }
}

applyRegex = function (body) {
    var y = body.match(/(?=[@])[*@]\w+/g);
    if(y) {
      var z = y.toString();
      var g = z.replace(/@/g, "");
      h = g.split(',');
    };
    var a = body.match(/(?=[#])[*#]\w+/g);
    if(a) {
    var b = a.toString();
    var c = b.replace(/#/g, "");
    d = c.split(',');
    };
}


Meteor.methods({
  postInsert: function(postAttributes) {
    var h, d = [];
    applyRegex(postAttributes.body);
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      username: user.username, 
      associated: [user.username],
      submitted: moment().format('MMM Do, H:mm'),
      pic: user.profile.picture,
      tagged: h,
      hashtags: d,
      comments: []
    });
    var postId = Posts.insert(post);
    var type = "post";
    if(h) {
      var arrayLength = h.length;
      for (var i = 0; i < arrayLength; i++) {
        createNotification(postId, type, h[i]);
    }
  }
    return {
      _id: postId
    };
  },
  follow: function(followAttributes) {
    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {'profile.following': followAttributes}});
    var url = Meteor.user().username;
    var type = " started following you";
    createNotification(url, type, followAttributes);
  },
  unfollow: function(user) {
    Meteor.users.update({_id: Meteor.userId()}, {$pull: {'profile.following': user}});
  }, 
  repost: function(repost) {
   var username = Meteor.user().username;
   Posts.update(repost.postId, {$addToSet: {associated: username}, $inc: {reposts: 1}});
   var type = " reposted your post";
   createNotification(repost.postId, type, repost.username);
  },
  sendmessagetest: function(messageTestAttributes) {
    var userExists = Meteor.users.findOne({username: messageTestAttributes.reciever});
    var messageExists = Messages.findOne({recieving: [userExists._id, this.userId]});
    if (messageExists) {
      Messages.update({_id: messageExists._id}, {$set: messageTestAttributes});
      return {_id: messageExists._id};
    } else {
      var user = Meteor.user();
      var text = _.extend(messageTestAttributes, {
      userId: user._id, 
      username: user.username,
      recieving: [userExists._id, this.userId],
      submitted: moment().format('MMM Do, H:mm'),
      userPhoto: user.profile.picture,
      recipPhoto: userExists.profile.picture
    });
      var createMessage = Messages.insert(text);
      return createMessage;
    }
  },
  sendtext: function(textAttributes) {
    var user = Meteor.user();
    var parties = Messages.findOne({_id: textAttributes.messageId});
    console.log(textAttributes.messageId);
    console.log(parties);
    var sending = _.extend(textAttributes, {
      userId: user._id, 
      username: user.username, 
      submitted: moment().format('MMM Do, H:mm'),
      recieving: parties.recieving
    });
    Texts.insert(sending);
    var id = textAttributes.messageId;
    var type = textAttributes.body;
    console.log(textAttributes.recipient);
    var recipient = _.without(parties.recieving, this.userId);
    createInboxNotification(id, type, recipient);
  },
  replytext: function (textAttributes) {
    Messages.update({_id: textAttributes.messageId}, {$set: {body: textAttributes.body}});
    var parties = Messages.findOne({_id: textAttributes.messageId});
    var user = Meteor.user();
    var sending = _.extend(textAttributes, {
      userId: user._id, 
      username: user.username, 
      submitted: moment().format('MMM Do, H:mm'),
      recieving: parties.recieving
    });
    Texts.insert(sending);
    var id = textAttributes.messageId;
    var type = textAttributes.body;
    var recipient = user._id;
    createInboxNotification(id, type, recipient);
  },
  favorite: function(favorite, userId) {
    
    var affected = Posts.update({
      _id: favorite.postId, 
      favoriters: {$ne: Meteor.user().username}
    }, {
      $addToSet: {favoriters: Meteor.user().username},
      $inc: {favorites: 1}
    });

    var userUpdate = Meteor.users.update({ 
      _id: this.userId },
      {
        $addToSet: {'profile.favorited': favorite.postId}
    });
    var id = favorite.postId;
    var type = "favorited your post";
    var recipient = favorite.username;
    createNotification(id, type, recipient);
  },
  unfavorite: function(unfavorite) {
    var unaffected = Posts.update({
      _id: unfavorite.postId, 
      favoriters: Meteor.user().username
    }, {
      $pull: {favoriters: Meteor.user().username},
      $inc: {favorites: -1}
    });
    var userUpdate = Meteor.users.update({ 
      _id: this.userId },
      {
        $pull: {'profile.favorited': unfavorite.postId}
    });
  },
  reply: function(commentAttributes) {
    var h, d = [];
    applyRegex(commentAttributes.comment);
    var user = Meteor.user();
    var fullComment = _.extend(commentAttributes, {
      userId: user._id, 
      username: user.username, 
      submitted: moment().format('MMM Do, H:mm'),
      picture: Meteor.user().profile.picture
    });
    var comment = Comments.insert(fullComment);
    var url = commentAttributes.postId;
    var type = " replied to your post";
    var recipient = commentAttributes.recipient;
    createNotification(url, type, recipient);
    if(h) {
      var arrayLength = h.length;
      var type = " tagged you in a comment"
      for (var i = 0; i < arrayLength; i++) {
        createNotification(url, type, h[i]);
    }
  }
  return Posts.update({_id: url}, {$push: {comments: {$each: [fullComment], $slice: -2}}});
  },
  delete: function(deletion) {
    if (deletion.username === this.userId) {
      return Posts.remove({_id: deletion._id})
    } else {
      return "error" 
    }
  },
  updatePicture: function(pic) {
    return Meteor.users.update({_id: this.userId}, {$set: {'profile.picture': pic.picture}});
  }
});