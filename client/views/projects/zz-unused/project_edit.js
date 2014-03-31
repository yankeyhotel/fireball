Template.projectEdit.rendered = function() {
	$('.datetimepicker').datetimepicker();
}

Template.projectEdit.helpers({
	userByRole: function (role) {
		// role = "Project Manager";
		// console.log( Meteor.users.find({}, { fields: { 'profile.role': 1, _id: 0 } }).fetch() );
		return Meteor.users.find({ "profile.role" : role });
	}
});


Template.projectEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentProjectId = this._id;
		var $title = $(e.target).find('[name=title]');

		var projectManagers = [];
		$('input[name=projectManagers]:checked').each(function() {
			projectManagers.push($(this).val());
		});

		var designers = [];
		$('input[name=designers]:checked').each(function() {
			designers.push($(this).val());
		});

		var webDevelopers = [];
		$('input[name=webDevelopers]:checked').each(function() {
			webDevelopers.push($(this).val());
		});

		var projectProperties = {
			title: $title.val(),
			status: $(e.target).find('[name=status]:checked').val(),
			dueDate: new Date($(e.target).find('[name=dueDate]').val()).getTime(),
			description: $(e.target).find('[name=description]').val(),
			projectManagers: projectManagers,
			designers: designers,
			webDevelopers: webDevelopers
		};

		Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
			if (error) {
				// display error to the user
				Errors.throw(error.reason);
			} else {
				Router.go('projectPage', {_id: currentProjectId});
			}
		});

		$('#project-modal').modal('hide');

	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this post?")) {
			var currentProjectId = this._id;
			Projects.remove(currentProjectId);
			Router.go('clientPage', {_id: this.clientId});
		}

		$('#project-modal').modal('hide');

	}

});