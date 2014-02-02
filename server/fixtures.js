if (Clients.find().count() === 0) {
	
	Clients.insert({
		title: "Maggiano's Little Italy"
	});

	Clients.insert({
		title: "Cultivar Coffee"
	});

	Clients.insert({
		title: "Boxer & Street"
	});

}