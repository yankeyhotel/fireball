Template.projectPage.helpers({
	
	setSession: function() {
		Session.set('projectId', this._id);
	},

	ownsProject: function() {
		return this.userId == Meteor.userId();
	},

	clientName: function(){
		return Clients.findOne(this.clientId).title;
	},

});


