Projects = new Meteor.Collection('projects');

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
		
		project = _.extend(_.pick(projectAttributes, 'clientId', 'title'),{
			userId: user.Id,
			author: user.profile.name,
			submitted: new Date().getTime()
		});

		return Projects.insert(project);

	}
});