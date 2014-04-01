
// Clients
// --------------------------------------------------------------------------------
Meteor.publish('clients', function() {
	return Clients.find();
});

Meteor.publish('clientsActive', function () {
	return Clients.find({status: "active"});
});

Meteor.publish('clientsArchived', function() {
	return Clients.find({status: "archived"});
})

Meteor.publish('clientsSingle', function(id) {
	return Clients.find({_id: id});
});



// Projects
// --------------------------------------------------------------------------------
Meteor.publish('projectsByClient', function (clientId) {
	return Projects.find({clientId: clientId});
});

Meteor.publish('projectsSingle', function (id) {
	return Projects.find({_id: id});
});



// Tasks
// --------------------------------------------------------------------------------
Meteor.publish('tasksByProject', function(projectId) {
	return Tasks.find({projectId: projectId});
});



// Notifications
// --------------------------------------------------------------------------------
Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});
});



// Users
// --------------------------------------------------------------------------------
Meteor.publish('allUsers', function() {
	return Meteor.users.find();
});




// To Do
Meteor.publish('projectsAll', function () {
	return Projects.find();
});


Meteor.publish('tasksByUser', function(id) {
	return Tasks.find({assignedTo: id});
});


