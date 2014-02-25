Projects = new Meteor.Collection('projects');

Projects.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Projects.deny({
	update: function(userId, clientId, fieldNames) {
		// may only edit the following two fields
		return (_.without(fieldNames, 'title', 'status', 'dueDate', 'description', 'projectManagers', 'designers', 'webDevelopers').length > 0);
	}
})

Meteor.methods({
	project: function(projectAttributes) {
		var user = Meteor.user();
		var client = Clients.findOne(projectAttributes.clientId);

		// ensure the user is logged in
		if (!user) {
			throw new Meteor.Error(401, "You need to login to create a project.")
		}

		// ensure the new project has a title
		if (!projectAttributes.title) {
			throw new Meteor.Error(422, "Please give your project a title.");
		}

		// ensure the project belongs to a client
		if (!client) {
			throw new Meteor.Error(422, "You must add a project to a specific client.");
		}
		
		project = _.extend(_.pick(projectAttributes, 'title', 'status', 'clientId', 'dueDate', 'description', 'projectManagers', 'designers', 'webDevelopers'),{
			userId: user._id,
			author: user.profile.name,
			submitted: new Date().getTime(),
			taskCount: 0
		});

		Clients.update(project.clientId, {$inc: {projectCount: 1}});

		return Projects.insert(project);

	}
});