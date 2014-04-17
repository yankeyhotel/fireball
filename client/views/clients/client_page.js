Template.clientPage.helpers({

	ownsClient: function() {
		return this.userId == Meteor.userId();
	},

	projects: function() {
		return Projects.find({clientId: this._id}, {sort: {dueDate: 1}});
	}

});
	

Template.clientPage.rendered = function() {

	// set up inline as defaule for x-editable
	$.fn.editable.defaults.placement 	= 'right';
	$.fn.editable.defaults.mode 		= 'popup';
	

	// --------------------------------------------------------------------------------
	// EDITABLE - Client Page Title Update
	// --------------------------------------------------------------------------------
		$(".title-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",
			
			success: function (response, newValue) {
				// update value in db
				var currentClientId = $(this).data("pk");
				var clientProperties = { title: newValue };

				Clients.update(currentClientId, {$set: clientProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});



	// --------------------------------------------------------------------------------
	// EDITABLE - Client Page Status Update
	// --------------------------------------------------------------------------------
		$(".status-update.editable:not(.editable-click)").editable('destroy').editable({
					
			url: 	"empty",
			toggle: "dblclick",

			value: function() {
				return $(this).closest("span").prev().text();
			},
			
			source: [
				{value: "active", text: "Active"}, 
				{value: "archived", text: "Archived"}
			],
			
			success: function (response, newValue) {
				// update value in db
				var currentClientId = $(this).data("pk");
				var clientProperties = { status: newValue };

				Clients.update(currentClientId, {$set: clientProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					} else {
						// Router.go();
					}
				});
			}// success

		});



	// --------------------------------------------------------------------------------
	// EDITABLE - Client Page Liason Update
	// --------------------------------------------------------------------------------
		// get project managers into an object for the select menu
		projectManagersObject = function() {

			var projectManagers = Meteor.users.find({ "profile.role" : 'Project Manager' }),
				pmOptions		= new Object(),
				count 			= 0;

			projectManagers.forEach(function (usr) {
				pmOptions[usr._id] = usr.profile.name;
				count += 1;
			});

			return pmOptions;
		}

		this.$(".liason-update.editable:not(.editable-click)").editable('destroy').editable({
			
			url: 	"empty",
			toggle: "dblclick",
			
			value: 	function() {
				return $("#clientLiason").data("pmid");
			},

			source: projectManagersObject,
			
			success: function (response, newValue) {
				// update value in db
				var currentClientId = $(this).data("pk");
				var clientProperties = { clientLiason: newValue };

				Clients.update(currentClientId, {$set: clientProperties}, function(error) {
					if (error) {
						Errors.throw(error.message)
					}
				});
			}// success

		});

}// Template.clientPage.rendered

