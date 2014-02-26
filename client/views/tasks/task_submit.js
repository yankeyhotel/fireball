Template.taskSubmit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var task = {
			title: $(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]:checked').val(),
			projectId: template.data._id,
			dueDate: new Date($(e.target).find('[name=dueDate]').val()).getTime(),
			assignedTo: $(e.target).find('[name=assignedTo]').val(),
		};

		Meteor.call('task', task, function(error, projectId) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				Router.go('projectPage', {_id: template.data._id});
			}
		});

		$('#task-modal').modal('hide');

	}

});