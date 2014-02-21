if (Clients.find().count() === 0) {
	
	var now = new Date().getTime();

	// Create two users
	var mattId = Accounts.createUser ({
		username: 'yankeyhotel',
		email: 'matt@switch.is',
		password: 'fattie77',
		profile: {
			name: 'Matt McClard',
			role: 'Nerd Commander'
		}
	});
	var matt = Meteor.users.findOne(mattId);

	var kelseyId = Accounts.createUser ({
		username: 'admin',
		email: 'kelsey@switch.is',
		password: 'Switch123',
		profile: {
			name: 'Kelsey Wiley',
			role: 'Cat Wrangler'
		}
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	// Add Test Clients
	var maggianosId = Clients.insert ({
		title: "Maggiano's Little Italy",
		userId: kelsey._id,
		author: kelsey.profile.name,
		status: "active",
		submitted: now - 7 * 3600 * 1000
	});

	var cultivarId = Clients.insert ({
		title: "Cultivar Coffee",
		userId: kelsey._id,
		author: kelsey.profile.name,
		status: "active",
		submitted: now - 10 * 3600 * 1000
	});

	var andres = Clients.insert ({
		title: "Andres Properties",
		userId: kelsey._id,
		author: kelsey.profile.name,
		status: "archived",
		submitted: now - 12 * 3600 * 1000
	});


	// Add Test Projects
	Projects.insert ({
		clientId: maggianosId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: now - 5 * 3600 * 1000,
		title: "Stuffed Pastas Email"
	});

	Projects.insert ({
		clientId: maggianosId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: now - 5 * 3600 * 1000,
		title: "Stuffed Pastas Website"
	})




}