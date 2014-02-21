Template.clientItem.helpers({

	ownsPost: function() {
		return this.userId == Meteor.userId();
	},

	projectsCount: function() {
		return Projects.find({clientId: this._id}).count();
	}

});