Template.projectSubmit.rendered = function() {
	$(".form_datetime").datetimepicker({
		autoclose: true,
		daysOfWeekDisabled: "0,6",
        format: "MM d, yyyy hh:ii",
        minuteStep: 15,
        minView: 0,
        showMeridian: true,
        startDate: new Date(),
    });
}


Template.projectSubmit.helpers({
	
	userByRole: function (role) {
		return Meteor.users.find({ "profile.role" : role });
	},

	setName: function(role) {
		if (role == "Project Manager") {
			return "projectManagers";
		} else if (role == "Designer") {
			return "designers";
		} else if (role == "Web Developer") {
			return "webDevelopers"
		}
	}

});


Template.projectSubmit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var $title = $(e.target).find('[name=title]');

		var projectManagers = [];
		$('input[name=projectManagers]:checked').each(function() {
			projectManagers.push($(this).val());
		});

		var designers = [];
		$('input[name=designers]:checked').each(function() {
			designers.push($(this).val());
		});

		var webDevelopers = [];
		$('input[name=webDevelopers]:checked').each(function() {
			webDevelopers.push($(this).val());
		});

		var project = {
			title: $title.val(),
			status: $(e.target).find('[name=status]:checked').val(),
			clientId: template.data._id,
			dueDate: new Date($(e.target).find('[name=dueDate]').val()).getTime(),
			description: $(e.target).find('[name=description]').val(),
			projectManagers: projectManagers,
			designers: designers,
			webDevelopers: webDevelopers
		};

		Meteor.call('project', project, function(error, projectId) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				$('#new-project-modal').modal('hide');
			}
		});

	}

});
