
Template.clientSubmit.helpers({
	projectManagers: function () {
		// console.log( Meteor.users.find({}, { fields: { 'profile.role': 1, _id: 0 } }).fetch() );
		return Meteor.users.find({ "profile.role" : 'Project Manager' });
	}
});


Template.clientSubmit.events ({
	'submit form': function(e) {
		e.preventDefault();

		var client = {
			title: 	$(e.target).find('[name=title]').val(),
			clientLiason: $(e.target).find('[name=clientLiason]:checked').val(),
			status: $(e.target).find('[name=status]:checked').val()
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
				$('#new-client-modal').modal('hide');
			}
		});

	}
});