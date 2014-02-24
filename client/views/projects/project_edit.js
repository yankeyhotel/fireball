Template.projectEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentProjectId = this._id;

		var projectProperties = {
			title: $(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]:checked').val()
		}

		Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
			if (error) {
				// display error to the user
				Errors.throw(error.reason);
			} else {
				Router.go('projectPage', {_id: currentProjectId});
			}
		});

		$('#project-modal').modal('hide')

	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this post?")) {
			var currentProjectId = this._id;
			Projects.remove(currentProjectId);
			Router.go('clientPage', {_id: this.clientId});
		}

		$('#project-modal').modal('hide')

	}

});