Template.messaging.events({
  'submit .messaging': function(e) {
    e.preventDefault();
    var x = [];
    var username = Meteor.user().username;
    var recipients = $(e.target).find('[name=recipient]').val();
    x.push(username, recipients);
    var message = {
      reciever: recipients,
      recipient: x,
      body: $(e.target).find('[name=body]').val()
  };
  Meteor.call('sendmessagetest', message, function(error, result) {
    if (result) {
      var text = {
        messageId: result._id,
        recipient: message.recipient,
        body: message.body
      };
      Meteor.call('sendtext', text);
    };
  });

  Router.go('/');
  }
});