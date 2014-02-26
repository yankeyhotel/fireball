Template.task.events ({

	'click .edit': function(e, template) {

		e.preventDefault();

		var taskEditForm = $("#task-edit-modal");
		var formatedDate = moment(template.data.dueDate).format("MM/DD/YYYY hh:mm A");

		// values of modal window to reflect current task
		taskEditForm.find('[name=_id]').val(template.data._id);
		taskEditForm.find('[name=title]').val(template.data.title);
		taskEditForm.find('[name=dueDate]').val(formatedDate);
		taskEditForm.find('[name=assignedTo]').val(template.data.assignedTo);

	},

	'click .delete': function(e, template) {
		e.preventDefault();

		var taskId = this._id;
		var taskTitle = this.title;

		if (confirm("Delete this task? \"" + taskTitle + "\"")) {
			Tasks.remove(taskId);
		}

	}

});