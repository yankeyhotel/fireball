Template.clientEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentClientId = this._id;

		var clientProperties = {
			title: $(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]:checked').val()
		}

		Clients.update(currentClientId, {$set: clientProperties}, function(error) {
			if (error) {
				// display error to the user
				Errors.throw(error.reason);
			} else {
				Router.go('clientPage', {_id: currentClientId});
			}
		});

	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this post?")) {
			var currentClientId = this._id;
			Clients.remove(currentClientId);
			Router.go('clientsList');
		}
	}

});