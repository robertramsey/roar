Template.login.events({
	'click #login': function (e, t) {
		e.preventDefault();
		var username = t.find('#login-username').value;
		console.log(username);
		var password = t.find('#login-password').value;
		Meteor.loginWithPassword(username, password, function(err) {
			if(err) {
				console.log(err)
				return false
			}
		});
		$('.loginmdl').modal('hide');
	},
	'click #create': function (e, t) {
		e.preventDefault();
		var username = t.find('#create-username').value;
		console.log(username);
		var password = t.find('#create-password').value;
		Accounts.createUser({username: username, password: password}, function(err) {
			if(err) {
				console.log(err)
				return false
			}
		});
		$('.loginmdl').modal('hide');
	}
})