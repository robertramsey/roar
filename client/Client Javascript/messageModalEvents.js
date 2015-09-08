Template.messageModal.events({
	'click #sendMessage': function(e) {
    e.preventDefault();
    var x = [];
    var username = Meteor.user().username;
    var recipients = $('#recipient-name').val();
    console.log(recipients);
    x.push(username, recipients);
    var message = {
      reciever: recipients,
      recipient: x,
      body: $('#message-text').val()
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
  $('.messagemdl').modal('hide');
  }
})