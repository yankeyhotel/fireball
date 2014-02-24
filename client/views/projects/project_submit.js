Template.projectSubmit.events ({

	'submit form': function(e, template) {

		e.preventDefault();

		var $title = $(e.target).find('[name=title]');
		var project = {
			title: $title.val(),
			status: $(e.target).find('[name=status]:checked').val(),
			clientId: template.data._id
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

})