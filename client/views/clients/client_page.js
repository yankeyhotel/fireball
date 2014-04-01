Template.clientPage.helpers({

	ownsClient: function() {
		return this.userId == Meteor.userId();
	},

	projects: function() {
		return Projects.find({clientId: this._id}, {sort: {dueDate: 1}});
	},

	findClientLiason: function(clientLiason) {
		var user = Meteor.users.findOne(clientLiason);
		if (user) {
			return user.profile.name;
		}
		return "no data yet";
	},

});



Template.clientPage.rendered = function() {

	// set up inline as defaule for x-editable
	$.fn.editable.defaults.mode = 'inline';

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


	$(".title-update.editable:not(.editable-click)").editable('destroy').editable({
		
		url: 	"empty",
		toggle: "dblclick",
		
		value: 	function() {
			return $(this).closest("span").prev().text();
		},
		
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


	// set up .status-update
	$(".status-update.editable:not(.editable-click)").editable('destroy').editable({
		
		url: 	"empty",
		toggle: "dblclick",
		
		value: 	function() {
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
				}
			});
		}// success

	});

	// set up .liason-update
	$(".liason-update.editable:not(.editable-click)").editable('destroy').editable({
		
		url: 	"empty",
		toggle: "dblclick",
		
		value: 	function() {
			return $(this).closest("span").prev().data("pmid");
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
