if (Clients.find().count() === 0) {
	
	Clients.insert({
		title: "Maggiano's Little Italy",
		status: "active"
	});

	Clients.insert({
		title: "Cultivar Coffee",
		status: "active"
	});

	Clients.insert({
		title: "Boxer & Street",
		status: "active"
	});

}