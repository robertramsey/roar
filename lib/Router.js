
var loginRequired = function () {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
};

Router.onBeforeAction(loginRequired, {
    only: ['postsList']
});

//Universal router
Router.configure({
  loginTemplate: 'login',
  layoutTemplate: 'layout',
  waitOn: function () {
    Meteor.subscribe('users');
    if (Meteor.userId()) {
        Meteor.subscribe('notifications'); 
        Meteor.subscribe('inboxNotifications');

      }
  }
});
Router.route('/singleposts/:_id', {
  name: 'postPage',
  waitOn: function () {
    return Meteor.subscribe('singlepost', this.params._id);
  }
});
//Homepage/users profile
Router.route('/', {
  name: 'postsList', 
  waitOn: function () {
    if (Meteor.userId()) {
    var id = Meteor.user().profile.following;
    return Meteor.subscribe('userprofile', id);
    }
  }, 
  data: function () {
    return {
      posts: Posts.find({}, {sort: {submitted: -1}}),
    };
  }
});

//Feed corresponding to linked hashtag
Router.route('tags', {
  path: '/tags/:hashtag',
  waitOn: function () {
    return Meteor.subscribe('hashtags', this.params.hashtag);
  }, 
  data: function () {
    return {
      posts: Posts.find(),
    };
  }

});

//Route shows all posts/retweets by particular user
Router.route('userProfile', {
  path: '/:username',
  waitOn: function () {
    return Meteor.subscribe('profile', this.params.username);
  },
  data: function () {
    return {
      username: this.params.username,
      posts: Posts.find({username: this.params.username}, {sort: {submitted: -1}})
    };
  }
});

//Route for inbox of current user
Router.route('inbox', {
  path: '/i/inbox/:url',
  waitOn: function () {
    var sessionId = this.params.url;
    return Meteor.subscribe('messagesInbox', sessionId);
  }
});


//Shows favorites of particular users
Router.route('favorites', {
  path: '/:username/favorites',
  waitOn: function () {
    return Meteor.subscribe('favorites', this.params.username);
  },
  data: function () {
    return {
      posts: Posts.find()
    };
  }
});

//Revise this to be Post discussion page
