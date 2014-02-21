Template.clientSubmit.events ({
	'submit form': function(e) {
		e.preventDefault();

		var client = {
			title: 	$(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]').val()
		}

		// call the client method in /collections/clients.js
		// to add the client to the db
		Meteor.call('client', client, function(error, id) {
			if (error) {
				// display error to user
				Errors.throw(error.reason);
				
				if (error.error === 302) {
					Router.go('clientPage', {_id: error.details});
				}
			} else {
				Router.go('clientPage', {_id: id});
			}
		});

	}
});