Template.inbox.helpers({
  messages: function() {
    return Messages.find({}, {sort: {submitted: 1}});
  }
});

Template.inbox.rendered = function () {
	$('.inner-texts').scrollTop($('.inner-texts').prop("scrollHeight"));
};

