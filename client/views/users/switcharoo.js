Template.switcharoo.helpers({

	tasksActive: function(){
		return Tasks.find( {status: "active", assignedTo: this._id}, {sort: {dueDate: 1}} ); 
	},

	tasksArchived: function(){
		return Tasks.find( {status: "archived", assignedTo: this._id}, {sort: {dueDate: 1}} ); 
	},	

});