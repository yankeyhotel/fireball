Template.usersNav.helpers({
	users: function() {
		return Meteor.users.find({}, {sort: {'profile.name': 1}});
	}
});

Template.userListItem.helpers ({
	user: function() {
		return Meteor.users.findOne({_id: this._id});
	}
});