Template.taskUserHldr.helpers({

	user: function() {
		var id = this.toString();
		var user = Meteor.users.findOne({_id: id});
		return user;
	},

	activeUser: function(usrId) {
		console.log(usrId, Meteor.userId());
		if ( usrId === Meteor.userId() ) {
			return "in active";
		} else {
			return "";
		}
	},

	tasks: function() {
		var userId = this.toString();
		return Tasks.find({assignedTo: userId, status: "active"}, {sort: {dueDate: 1}} );
	},

	tasksArchived: function() {
		var userId = this.toString();
		return Tasks.find({assignedTo: userId, status: "archived"}, {sort: {dueDate: 1}} );
	}

});

Template.taskUserHldr.events ({

	'click .add-task' : function(e) {
		e.preventDefault();
		var clickUser = $(e.target).data("user");
		$("#task-user-select").val(clickUser);
	}

});