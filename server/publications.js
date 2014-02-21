Meteor.publish('clients', function () {
	return Clients.find();
});

Meteor.publish('projects', function () {
	return Projects.find();
});