Template.clientPage.helpers({
	ownsPost: function() {
		return this.userId == Meteor.userId();
	},
});