Template.switcharoo.helpers({

	tasksActive: function(){
		console.log(Tasks.find({status: "active", assignedTo: this._id}).count());
		return Tasks.find({status: "active", assignedTo: this._id}); 
	},

	tasksArchived: function(){
		return Tasks.find({status: "archived", assignedTo: this._id}); 
	},	

});