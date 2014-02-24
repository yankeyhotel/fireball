Template.clientItem.helpers({

	ownsPost: function() {
		return this.userId == Meteor.userId();
	}

});