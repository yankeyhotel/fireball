Clients = new Meteor.Collection('clients');
Clients.allow ({
	insert: function(userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
});