Template.projectSubmit.rendered = function() {
    $('.datetimepicker').datetimepicker();
}

Template.projectSubmit.helpers({
	userByRole: function (role) {
		// role = "Project Manager";
		// console.log( Meteor.users.find({}, { fields: { 'profile.role': 1, _id: 0 } }).fetch() );
		return Meteor.users.find({ "profile.role" : role });
	}
});

Template.projectSubmit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var $title = $(e.target).find('[name=title]');

		var project = {
			title: $title.val(),
			status: $(e.target).find('[name=status]:checked').val(),
			clientId: this._id
		};

		Meteor.call('project', project, function(error, projectId) {
			if (error) {
				throwError(error.reason);
			} else {
				$title.val('');
			}
		});

		$('#project-modal').modal('hide');

	}

});



Template.userByRole.helpers({

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