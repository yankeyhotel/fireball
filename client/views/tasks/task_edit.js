Template.taskEdit.rendered = function() {
	$('#task-edit-modal').on('hidden.bs.modal', function () {
		$(this).find('[name=title]').val("");
		$(this).find('[name=dueDate]').val("");
	});
}


Template.taskEdit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var currentTaskId = $(e.target).find('[name=_id]').val();
		var currentProjectId = this._id;

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
				$('#task-edit-modal').modal('hide');
			}
		});

	},

	'click .delete': function(e, template) {
		e.preventDefault();

		var taskId = $(e.target).parent().parent().find('input[name=_id]').val();
		var taskTitle = $(e.target).parent().parent().find('input[name=title]').val();

		if (confirm("Delete this task? \"" + taskTitle + "\"")) {
			Tasks.remove(taskId);
		}

		$('#task-edit-modal').modal('hide');
	}

});