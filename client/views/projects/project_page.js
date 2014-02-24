Template.projectPage.helpers({
	
	ownsProject: function() {
		return this.userId == Meteor.userId();
	},

	clientName: function(){
		return Clients.findOne(this.clientId).title;
	}

});