// $(document).on('keyup', ".box", function(e) {
//     if (e.keyCode == 32) {
//         var text = $(this).text();
//         var regexp = /(?=[@#])[*@#]\w+/g;
//         var reg = /(?=[#])[*#]\w+/g;
//         var exp = /(?=[@])[*@]\w+/g;
//         var newText = text.replace(regexp, function(match) {
//           if(match.match(exp)) {
//             var removal = match.replace(/@/, "");
//             return "<a href='" + removal + "'>" + match + "</a>";
//           } else if (match.match(reg)) {
//             var removal = match.replace(/#/, "");
//             return "<a href='tags/" + removal + "'>" + match + "</a>";
//           }
//           });

//         $(this).html(newText);
//         setEndOfContenteditable(this);
//     }
// });

// function setEndOfContenteditable(contentEditableElement)
// {
//     var range,selection;
//     if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
//     {
//         range = document.createRange();//Create a range (a range is a like the selection but invisible)
//         range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
//         range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
//         selection = window.getSelection();//get the selection object (allows you to change selection)
//         selection.removeAllRanges();//remove any selections already made
//         selection.addRange(range);//make the range you have just created the visible selection
//     }
//     else if(document.selection)//IE 8 and lower
//     { 
//         range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
//         range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
//         range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
//         range.select();//Select the range (make it the visible selection
//     }
// }


// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_ONLY'
// });


// Template.userProfile.events({
//   'click #follow': function(e, template) {
//     e.preventDefault();
//     var user = Router.current().params.username;
//     Meteor.call('follow', user);
//   }
// });

// Template.postsList.events({
//   'click .tweetbox': function(e) {
//     e.preventDefault();
//     var image = $(".myImageUpload").get(0).files[0];
//     var upload = Images.insert(image);

//     var cdContent = $('.box').html();
//     var post = {
//       tweet: cdContent,
//       image: "/cfs/files/images/" + upload._id,
//       imageId: upload._id
//     };

//     Meteor.call('postInsert', post);
//   }
// });

// Template.messaging.events({
//   'submit .messaging': function(e) {
//     e.preventDefault();
//     var x = [];
//     var username = Meteor.user().username;
//     var recipients = $(e.target).find('[name=recipient]').val();
//     x.push(username, recipients);
//     var message = {
//       recipient: x,
//       body: $(e.target).find('[name=body]').val()
//   };
//   Meteor.call('sendmessagetest', message, function(error, result) {
//     if (result) {
//       var text = {
//         messageId: result._id,
//         recipient: message.recipient,
//         body: message.body
//       };
//       Meteor.call('sendtext', text);
//     };
//   });

//   Router.go('/');
//   }
// });


// Template.postItem.events({
//   'click .favorite': function(e) {
//    e.preventDefault();
//    var favorite = {
//     postId: this._id,
//     username: this.username
//    };
//    Meteor.call('favorite', favorite);
//   },
//   'click .retweet': function(e) {
//     e.preventDefault();
//     var retweet = {
//     postId: this._id,
//     username: this.username
//    };
//     Meteor.call('retweet', retweet);
//   },
//   // 'click .reply': function(e) {
//   //   e.preventDefault();
//   //   var id = this._id;
//   //   Session.set('commentSession', id);
//   //   $("#HAkpj2vv82ox4hp4X").collapse();
//   // },
//   'click .commentSubmit': function(e) {
//     e.preventDefault();
//     var cdContent = $('.' + this._id).html();
//     console.log(cdContent);
//     var reply = {
//       comment: cdContent,
//       postId: this._id,
//       recipient: this.username
//     };
//     Meteor.call('reply', reply);
//   }
// });

// Template.postItem.helpers({
//   retweetThere: function () {
//     var followers = Meteor.user().profile.following;
//     var associated = this.associated;
//     var userprofile = Meteor.users.findOne();
//     console.log(associated[0]);
//     var username = this.username;
//     console.log(username);
//     var crossover = _.intersection(followers, associated);
//     console.log(crossover[0]);
//     if (crossover[0] === username) {
//       return false;
//     } else if (Router.current().params.username) { 
//       return false;
//     } else {
//       return true;
//     };
  
//   },
//   retweeter: function () {
//     var followers = Meteor.user().profile.following;
//     var associated = this.associated;
//     var crossover = _.intersection(followers, associated);
//     return crossover[0];
//   }
      
// });

// Template.commentList.helpers({
//   comments: function () {
//     return Posts.find({postId: this._id}, {fields: {comments: 1}});
//   }
// });

// Template.inbox.helpers({
//   messages: function() {
//     return Messages.find();
//   },
//   textsload: function () {
//     return Session.get('textsLoadSession');
//   },
//   texts: function () {
//     var textId = Session.get('textsLoadSession');
//     return Texts.find({messageId: textId});
//   }
// });

// Template.textitem.helpers({
//   side: function () {
//     var username = this.username;
//     var currentUser = Meteor.user().username;
//     if(username === currentUser) {
//       return "left";
//     } else {
//       return "right"
//     }
//   }
// });

// Template.inbox.events({
//   'click .inboxbutton': function (e) {
//     e.preventDefault();
//     var id = this._id;
//     Session.set('textsLoadSession', id);
//   }
// });

// Template.notifications.helpers({
//   notificationCount: function () {
//     return Notifications.find({recipient: Meteor.user().username, read: false}).count();
//   },
//   notifications: function () {
//     return Notifications.find({recipient: Meteor.user().username});
//   }
// });

// Template.notificationItem.events({
//   'click a': function() {
//     Notifications.update(this._id, {$set: {read: true}});
//   }
// });