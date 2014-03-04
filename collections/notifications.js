Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	update: ownsDocument
});

createTaskNotification = function(task) {

	var project = Tasks.findOne(task.projectId);

	// if (task.assignedTo !== task.userId) {
		Notifications.insert({
			userId: task.assignedTo,
			projectId: task.projectId,
			taskId: task._id,
			taskAuthor: task.author,
			read: false
		});
	// }

};