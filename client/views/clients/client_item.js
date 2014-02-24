Template.clientItem.helpers({

	ownsPost: function() {
		return this.userId == Meteor.userId();
	},

	findClientLiason: function(clientLiason) {
		var user = Meteor.users.findOne({_id: clientLiason});
		return user.profile.name;
	}

});