Template.clientsList.helpers({
	clients: function(){
		return Clients.find({}, {sort: {title: 1}}); // order by most recent client
	}
});