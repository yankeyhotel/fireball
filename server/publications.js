Meteor.publish('clients', function () {
	return Clients.find();
});


Meteor.publish('projects', function (clientId) {
	return Projects.find({clientId: clientId});
});


Meteor.publish('projectsPage', function (id) {
	return Projects.find({_id: id});
});


Meteor.publish('allUsers', function() {
	return Meteor.users.find();
});


Meteor.publish('tasks', function(projectId) {
	return Tasks.find({projectId: projectId});
});


Meteor.publish('projectsAll', function () {
	return Projects.find();
});


Meteor.publish('tasksByUser', function() {
	return Tasks.find({userId: this.userId});
});
