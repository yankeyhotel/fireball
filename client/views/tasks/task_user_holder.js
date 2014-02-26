Template.taskUserHldr.helpers({

	user: function() {
		var id = this.toString();
		var user = Meteor.users.findOne({_id: id});
		return user;
	},

	tasks: function() {
		var userId = this.toString();
		var projectId = Session.get('projectId');
		return Tasks.find({assignedTo: userId, projectId: projectId});
	}

});

Template.taskUserHldr.events ({

	'click .add-task' : function(e) {
		e.preventDefault();
		var clickUser = $(e.target).data("user");
		$("#task-user-select").val(clickUser);
	}

});