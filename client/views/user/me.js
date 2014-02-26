Template.me.helpers({

	me: function() {
		return Meteor.user();
	},

	tasksActive: function(){
		return Tasks.find({status: "active", assignedTo: Meteor.userId()}); 
	},

	tasksArchived: function(){
		return Tasks.find({status: "archived", assignedTo: Meteor.userId()}); 
	},	

});

