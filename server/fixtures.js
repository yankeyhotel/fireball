if (Clients.find().count() === 0) {
	
	var now = new Date().getTime();


	// Create default super users
	// ------------------------------------------------
	var mattId = Accounts.createUser ({
		username: 'yankeyhotel',
		email: 'matt@switch.is',
		password: 'fattie77',
		profile: {
			name: 'Matt McClard',
			role: 'Web Developer',
			roleNickname: 'Nerd Commander'
		}
	});
	var matt = Meteor.users.findOne(mattId);

	var kelseyId = Accounts.createUser ({
		username: 'kesley',
		email: 'kelsey@switch.is',
		password: 'Switch123',
		profile: {
			name: 'Kelsey Wiley',
			role: 'Project Manager',
			roleNickname: 'Cat Wrangler'
		}
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	// Create Switch Elite
	// ------------------------------------------------
	var kimiId = Meteor.users.insert({
		profile: { 
			name: 'Kimi Dallman',
			role: 'Leadership',
			roleNickname: 'Switch Elite' 
		}
	});
	var kimi = Meteor.users.findOne(kimiId);

	var glenId = Meteor.users.insert({
		profile: { 
			name: 'Glen Collins',
			role: 'Leadership',
			roleNickname: 'Switch Elite' 
		}
	});
	var glen = Meteor.users.findOne(glenId);


	// Create Cat Wranglers
	// ------------------------------------------------
	var katieId = Meteor.users.insert({
		profile: { 
			name: 'Katie Coffee',
			role: 'Project Manager',
			roleNickname: 'Cat Wrangler' 
		}
	});
	var katie = Meteor.users.findOne(katieId);

	var melissaId = Meteor.users.insert({
		profile: { 
			name: 'Melissa Mason',
			role: 'Project Manager',
			roleNickname: 'Cat Wrangler' 
		}
	});
	var melissa = Meteor.users.findOne(melissaId);


	// Create Pretentious Designers
	// ------------------------------------------------
	var jamieId = Meteor.users.insert({
		profile: { 
			name: 'Jamie Wilson',
			role: 'Designer',
			roleNickname: 'Pretentious Designer' 
		}
	});
	var jamie = Meteor.users.findOne(jamieId);

	var justinId = Meteor.users.insert({
		profile: { 
			name: 'Justin Childress',
			role: 'Designer',
			roleNickname: 'Pretentious Designer' 
		}
	});
	var justin = Meteor.users.findOne(justinId);

	var ashaunId = Meteor.users.insert({
		profile: { 
			name: 'Ashaun Eppes',
			role: 'Designer',
			roleNickname: 'Pretentious Designer' 
		}
	});
	var ashaun = Meteor.users.findOne(ashaunId);

	var mollyId = Meteor.users.insert({
		profile: { 
			name: 'Molly Valdez',
			role: 'Designer',
			roleNickname: 'Pretentious Designer' 
		}
	});
	var molly = Meteor.users.findOne(mollyId);


	// Create Nerd Commanders
	// ------------------------------------------------
	var bootsId = Meteor.users.insert({
		profile: { 
			name: 'Boots Highland',
			role: 'Web Developer',
			roleNickname: 'Nerd Commander' 
		}
	});
	var boots = Meteor.users.findOne(bootsId);

	var cameronId = Meteor.users.insert({
		profile: { 
			name: 'Cameron Scroggins',
			role: 'Web Developer',
			roleNickname: 'Nerd Commander' 
		}
	});
	var cameron = Meteor.users.findOne(cameronId);



	// Add Test Clients
	// ------------------------------------------------
	var maggianosId = Clients.insert ({
		title: "Maggiano's Little Italy",
		userId: matt._id,
		author: matt.profile.name,
		status: "active",
		submitted: now - 7 * 3600 * 1000,
		projectCount: 2,
		clientLiason: kelsey._id
	});

	var cultivarId = Clients.insert ({
		title: "Cultivar Coffee",
		userId: kelsey._id,
		author: kelsey.profile.name,
		status: "active",
		submitted: now - 10 * 3600 * 1000,
		projectCount: 0,
		clientLiason: melissa._id,
	});

	var andresId = Clients.insert ({
		title: "Andres Properties",
		userId: kelsey._id,
		author: kelsey.profile.name,
		status: "archived",
		submitted: now - 12 * 3600 * 1000,
		projectCount: 0,
		clientLiason: kelsey._id,
	});


	// Add Test Projects
	// ------------------------------------------------
	var stuffedEmailId = Projects.insert ({
		clientId: maggianosId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: now - 5 * 3600 * 1000,
		dueDate: now + 30 * 3600 * 1000,
		title: "Stuffed Pastas Email",
		description: "Dolore magna aliquam erat volutpat ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper! Parum claram anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima eodem modo typi! Saepius claritas est etiam processus dynamicus qui sequitur mutationem consuetudium lectorum mirum est notare quam. Ut aliquip ex ea commodo consequat, duis autem vel eum iriure.",
		status: "active",
		taskCount: 0,
		projectManagers: [
			kelsey._id,
			melissa._id
		],
		designers: [
			jamie._id,
			ashaun._id
		],
		webDevelopers: [
			boots._id
		],
	});

	var stuffedWebId = Projects.insert ({
		clientId: maggianosId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: now - 5 * 3600 * 1000,
		dueDate: now + 30 * 3600 * 1000,
		title: "Stuffed Pastas Website",
		description: "Litterarum formas humanitatis per seacula quarta decima et quinta decima eodem modo typi qui? Wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis? Praesent luptatum zzril delenit augue duis, dolore te feugait? Eorum claritatem Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius claritas est etiam processus.",
		status: "active",
		taskCount: 2,
		projectManagers: [
			kelsey._id,
			melissa._id
		],
		designers: [
			jamie._id,
			ashaun._id
		],
		webDevelopers: [
			matt._id
		],
	});


	// Add Test Tasks
	// ------------------------------------------------
	Tasks.insert ({
		projectId: stuffedWebId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: now - 5 * 3600 * 1000,
		dueDate: now + 2 * 3600 * 1000,
		title: "Create New Contact Page",
		description: "Gothica quam nunc putamus parum claram anteposuerit litterarum formas humanitatis. Per seacula quarta decima et quinta, decima eodem modo typi qui nunc. Duis autem vel eum iriure dolor in hendrerit in. Qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
		assignedTo: matt._id,
		status: 'active',
	});

	Tasks.insert ({
		projectId: stuffedWebId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: now - 5 * 3600 * 1000,
		dueDate: now + 1 * 3600 * 1000,
		title: "Create New About Page",
		description: "Gothica quam nunc putamus parum claram anteposuerit litterarum formas humanitatis. Per seacula quarta decima et quinta, decima eodem modo typi qui nunc. Duis autem vel eum iriure dolor in hendrerit in. Qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
		assignedTo: matt._id,
		status: 'active',
	});



}