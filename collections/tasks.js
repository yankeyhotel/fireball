Tasks = new Meteor.Collection('tasks');

Tasks.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Tasks.deny({
	update: function(userId, projectId, fieldNames) {
		// may only edit the following fields
		return (_.without(fieldNames, 'title', 'status', 'dueDate', 'assignedTo').length > 0);
	}
})

Meteor.methods({
	task: function(taskAttributes) {

		var user = Meteor.user();
		var project = Projects.findOne(taskAttributes.projectId);

		// ensure the user is logged in
		if (!user) {
			throw new Meteor.Error(401, "You need to login to create a project.")
		}

		// ensure the new project has a title
		if (!taskAttributes.title) {
			throw new Meteor.Error(422, "Please give your task a title.");
		}

		// ensure the project belongs to a client
		if (!project) {
			throw new Meteor.Error(422, "You must add a task to a specific project.");
		}

		// ensure the task has someone assigned to it
		if (!taskAttributes.assignedTo) {
			throw new Meteor.Error(422, "You must assign someone to this task.");
		}
		
		task = _.extend(_.pick(taskAttributes, 'title', 'status', 'projectId', 'dueDate', 'assignedTo'), {
			userId: user._id,
			author: user.profile.name,
			submitted: new Date().getTime(),
			comments: 0
		});

		Projects.update(task.projectId, {$inc: {taskCount: 1}});

		return Tasks.insert(task);

	}
});