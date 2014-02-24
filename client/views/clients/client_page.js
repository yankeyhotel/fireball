Template.clientPage.helpers({
	ownsClient: function() {
		return this.userId == Meteor.userId();
	},

	projects: function() {
		return Projects.find({clientId: this._id});
	},

	findClientLiason: function(clientLiason) {
		var user = Meteor.users.findOne({_id: clientLiason});
		return user.profile.name;
	}
});