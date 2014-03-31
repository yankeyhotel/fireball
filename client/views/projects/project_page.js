Template.projectPage.helpers({
	
	setSession: function() {
		Session.set('projectId', this._id);
	},

	ownsProject: function() {
		return this.userId == Meteor.userId();
	},

	clientName: function(clientId){
		return Clients.findOne({_id: clientId}).title;
	},

	projectProgress: function (totalTasks) {
		var activeTasks = Tasks.find({projectId: this._id, status: "archived"}).count();
		var percent = Math.floor(( activeTasks / totalTasks ) * 100);
		return percent;
	},

	getName: function (id) {
		usr = Meteor.users.findOne({ _id: id });
		return usr.profile.name;
	}

});



Template.projectPage.rendered = function(template) {

	// set up inline as defaule for x-editable
	$.fn.editable.defaults.mode = 'inline';

	// find user groups by roles
	function findUsersByRole(role) {
		var designers 		= Meteor.users.find({ "profile.role" : role }),
			dOptions		= new Object(),
			count 			= 0;

		designers.forEach(function (usr) {
			dOptions[usr._id] = usr.profile.name;
			count += 1;
		});

		return dOptions;
	}


	// EDIT - Project Title
	// --------------------------------------------------------------------------------
		$(".title-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",
			
			success: function (response, newValue) {
				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { title: newValue };

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------


	// EDIT - Project Status
	// --------------------------------------------------------------------------------
		$(".status-update.editable:not(.editable-click)").editable('destroy').editable({
		
			url: 	"empty",
			toggle: "dblclick",
			
			source: [
				{value: "active", text: "Active"}, 
				{value: "archived", text: "Archived"}
			],
			
			success: function (response, newValue) {
				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { status: newValue };

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------


	// EDIT - Project Managers
	// --------------------------------------------------------------------------------
		$(".pm-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",

			source: findUsersByRole('Project Manager'),
			
			success: function (response, newValue) {

				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { projectManagers: newValue };

				console.log(currentProjectId, projectProperties);

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------


	// EDIT - Desigenrs
	// --------------------------------------------------------------------------------
		$(".d-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",

			source: findUsersByRole('Designer'),
			
			success: function (response, newValue) {

				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { designers: newValue };

				console.log(currentProjectId, projectProperties);

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------


	// EDIT - Web Developers
	// --------------------------------------------------------------------------------
		$(".wd-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",

			source: findUsersByRole('Web Developer'),
			
			success: function (response, newValue) {

				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { webDevelopers: newValue };

				console.log(currentProjectId, projectProperties);

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------



}
