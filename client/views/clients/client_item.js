Template.clientItem.helpers({

	ownsPost: function() {
		return this.userId == Meteor.userId();
	},

	findClientLiason: function(clientLiason) {
		var user = Meteor.users.findOne(clientLiason);
		if (user) {
			return user.profile.name;
		}
		return "no data yet";
	},

	findProjectManagers: function() {
		return Meteor.users.find({ "profile.role" : 'Project Manager' })
	},

	isClientActive: function(status) {
		if (status == "active") {
			return true;
		} else {
			return false;
		}
	}

});



Template.clientItem.rendered = function(template) {

	// set up inline as defaule for x-editable
	$.fn.editable.defaults.placement 	= 'top';
	$.fn.editable.defaults.mode 		= 'popup';


	// set up .status-update
	this.$(".status-update.editable:not(.editable-click)").editable('destroy').editable({
		
		url: 	"empty",
		toggle: "dblclick",
		
		value: 	function() {
			return $(this).closest(".popover").prev().text();
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
				}
			});
		}// success

	});



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

	// set up .liason-update
	this.$(".liason-update.editable:not(.editable-click)").editable('destroy').editable({
		
		url: 	"empty",
		toggle: "dblclick",
		
		value: 	function() {
			return $(this).closest(".popover").prev().data("pmid");
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

}
