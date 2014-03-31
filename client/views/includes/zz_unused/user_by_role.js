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