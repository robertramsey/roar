Template.layout.events({
	'click .message-modal': function(e) {
		e.preventDefault();
		$('.messagemdl').modal('show');
	}
});