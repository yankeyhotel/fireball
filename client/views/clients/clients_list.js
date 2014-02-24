Template.clientsList.helpers({
	clients: function(){
		return Clients.find({}, {sort: {projectCount: -1}}); // order by most recent client
	}
});