Template.clientPage.helpers({
	ownsPost: function() {
		return this.userId == Meteor.userId();
	},

	projects: function() {
		return Projects.find({clientId: this._id});
	}
});