Template.projectItem.helpers({

	getName: function (id) {
		usr = Meteor.users.findOne({ _id: id });
		return usr.profile.name;
	}

});