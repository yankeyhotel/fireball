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

	projectProgress: function (totalTasks) {
		var activeTasks = Tasks.find({projectId: this._id, status: "archived"}).count();
		var percent = Math.floor(( activeTasks / totalTasks ) * 100);
		return percent;
	}

});


Template.projectPage.rendered = function(template) {
	$('#textArea.editable:not(.editable-click)').editable('destroy').editable({
		success: function(response, newValue) {
			console.log(response, newValue);		
		}
	});
}

// Template.projectEdit.rendered = function() {
// 	$('.datetimepicker').datetimepicker();
// }
