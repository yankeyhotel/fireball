Template.projectSubmit.rendered = function() {
	$('.datetimepicker').datetimepicker();
}


Template.projectSubmit.helpers({
	userByRole: function (role) {
		// role = "Project Manager";
		// console.log( Meteor.users.find({}, { fields: { 'profile.role': 1, _id: 0 } }).fetch() );
		return Meteor.users.find({ "profile.role" : role });
	}
});


Template.projectSubmit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

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

		var project = {
			title: $title.val(),
			status: $(e.target).find('[name=status]:checked').val(),
			clientId: template.data._id,
			dueDate: new Date($(e.target).find('[name=dueDate]').val()).getTime(),
			description: $(e.target).find('[name=description]').val(),
			projectManagers: projectManagers,
			designers: designers,
			webDevelopers: webDevelopers
		};

		Meteor.call('project', project, function(error, projectId) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				$('#new-project-modal').modal('hide');
			}
		});

	}

});
