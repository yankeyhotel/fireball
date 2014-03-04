Template.taskEdit.helpers({
	getUserName: function(userId) {
		return Meteor.users.findOne(userId).profile.name;
	}
});


Template.taskEdit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var currentTaskId = template.data._id;
		var currentProjectId = Session.get("projectId");

		var task = {
			title: $(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]:checked').val(),
			dueDate: new Date($(e.target).find('[name=dueDate]').val()).getTime(),
			assignedTo: $(e.target).find('[name=assignedTo]').val(),
		};

		Tasks.update(currentTaskId, {$set: task}, function(error) {
			if (error) {
				// display error to the user
				Errors.throw(error.reason);
			} else {
				$('#'+currentTaskId).modal('hide');
			}
		});

	},

	'click .delete': function(e, template) {
		e.preventDefault();

		var taskId = template.data._id;
		var taskTitle = $(e.target).parent().parent().find('input[name=title]').val();

		if (confirm("Delete this task? \"" + taskTitle + "\"")) {
			Tasks.remove(taskId);
		}

		$('#'+taskId).modal('hide');
	}

});