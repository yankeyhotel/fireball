Template.freezerList.helpers({
	clients: function(){
		return Clients.find({status: "archived"}, {sort: {projectCount: -1}}); // order by most recent client
	}
});