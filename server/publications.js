
// Clients
Meteor.publish('clientsActive', function () {
	return Clients.find({status: "active"});
});

Meteor.publish('clientsArchived', function() {
	return Clients.find({status: "archived"});
})



// To Do

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


Meteor.publish('tasksByUser', function(id) {
	return Tasks.find({assignedTo: id});
});


Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});
});