Template.inbox.helpers({
  messages: function() {
    return Messages.find();
  }
});

Template.inbox.rendered = function () {
	$('.inner-texts').scrollTop($('.inner-texts').prop("scrollHeight"));
};

