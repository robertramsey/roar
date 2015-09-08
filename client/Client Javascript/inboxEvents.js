Template.inbox.events({
  'click .inboxbutton': function (e) {
    e.preventDefault();
    var id = this._id;
    Router.go('/i/inbox/' + id);
  },
  'click .send-text': function(e) {
    e.preventDefault();

    var cdContent = $('.replyfield').html();
    var id = Router.current().params.url;
    var participants = Messages.findOne({_id: id}, {fields: {recipient: 1}});
    var user = Meteor.user().username;
    var recipients = _.without(participants.recipient, user);

    var text = {
      messageId: id,
      body: cdContent,
      recipients: recipients
    };

    Meteor.call('replytext', text);
    $('.inner-texts').scrollTop($('.inner-texts').prop("scrollHeight"));
    $('.replyfield').html("");
  }
});