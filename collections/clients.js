Clients = new Meteor.Collection('clients');

Clients.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Meteor.methods({
	client: function(clientAttributes) {
		var user 				= Meteor.user(),
			clientWithSameTitle = Clients.findOne({ title: clientAttributes.title });

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, "You need to login to create a new client!");
		}

		// ensure the client has a title
		if (!clientAttributes.title) {
			throw new Meteor.Error(422, "Please fill in a Client Name.");
		}

		// ensure the client is unique
		if (clientAttributes.title && clientWithSameTitle) {
			throw new Meteor.Error(302, "This client has already been created", clientWithSameTitle._id);
		}

		// pick out the whitelisted keys
		var client = _.extend(_.pick(clientAttributes, 'title', 'status'), {
			userId: 	user._id,
			author: 	user.email,
			submitted: 	new Date().getTime()
		});

		var clientId = Clients.insert(client);

		return clientId;
	}
});