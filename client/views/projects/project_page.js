Template.projectPage.helpers({

	ownsProject: function() {
		return this.userId == Meteor.userId();
	},

	activeUser: function(usrId) {
		if ( usrId === Meteor.userId() ) {
			return "active";
		} else {
			return "";
		}
	},

	clientName: function(clientId){
		if (clientId != undefined) {
			return Clients.findOne(clientId).title;
		} 
	},
	
	getName: function (id) {
		usr = Meteor.users.findOne({ _id: id });
		return usr.profile.name;
	},

	projectProgress: function (totalTasks) {
		var activeTasks = Tasks.find({projectId: this._id, status: "archived"}).count();
		var percent = Math.floor(( activeTasks / totalTasks ) * 100);
		return percent;
	},

});



Template.projectPage.rendered = function(template) {

	// set up inline as defaule for x-editable
	$.fn.editable.defaults.placement 	= 'right';
	$.fn.editable.defaults.mode 		= 'popup';

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


	// EDIT - Due Date
	// --------------------------------------------------------------------------------
		$(".dueDate-update.editable:not(.editable-click)").editable('destroy').editable({
		
			url: 	"empty",
			toggle: "dblclick",

			clear: false,
			format: 'DD-MM-YYYY h:mm a',  // 03/26/2014 12:09 PM   
			viewformat: 'MM d, yyyy', // H:iip

			datetimepicker: {
				autoclose: true,
				daysOfWeekDisabled: '0,6',
				minuteStep: 15,
				minView: 0,
				showMeridian: true,
				startDate: new Date(),
				todayBtn: true,
			},
			
			success: function (response, newValue) {
				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { dueDate: new Date(newValue).getTime() };

				console.log(newValue, projectProperties);

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message);
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

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------


	// EDIT - Description
	// --------------------------------------------------------------------------------
		$(".description-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",
			rows: 	3,
			
			success: function (response, newValue) {

				// update value in db
				var currentProjectId = $(this).data("pk");
				var projectProperties = { description: newValue };

				Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});
	// --------------------------------------------------------------------------------



}
