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
			roleNickname: 'Nerd Commander',
			photo: 'self_portrait_matt.jpg',
			color: 'green'
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
			roleNickname: 'Cat Wrangler',
			photo: 'self_portrait_kelsey.jpg',
			color: 'silver'
		}
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	// Create Switch Elite
	// ------------------------------------------------
	var kimiId = Accounts.createUser ({
		username: "kimi",
		email: "kimi@switch.is",
		password: "Switch123",
		profile: { 
			name: 'Kimi Dallman',
			role: 'Leadership',
			roleNickname: 'Switch Elite',
			photo: 'self_portrait_kimi.jpg',
			color: "red"
		}
	});
	var kimi = Meteor.users.findOne(kimiId);

	var glenId = Accounts.createUser ({
		username: "glen",
		email: "glen@switch.is",
		password: "Switch123",
		profile: { 
			name: 'Glen Collins',
			role: 'Leadership',
			roleNickname: 'Switch Elite',
			photo: 'self_portrait_glen.jpg',
			color: "purple"
		}
	});
	var glen = Meteor.users.findOne(glenId);


	// Create Cat Wranglers
	// ------------------------------------------------
	var katieId = Meteor.users.insert({
		profile: { 
			name: 'Katie Coffee',
			role: 'Project Manager',
			roleNickname: 'Cat Wrangler',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var katie = Meteor.users.findOne(katieId);

	var melissaId = Meteor.users.insert({
		profile: { 
			name: 'Melissa Mason',
			role: 'Project Manager',
			roleNickname: 'Cat Wrangler',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var melissa = Meteor.users.findOne(melissaId);


	// Create Pretentious Designers
	// ------------------------------------------------
	var jamieId = Meteor.users.insert({
		profile: { 
			name: 'Jamie Wilson',
			role: 'Designer',
			roleNickname: 'Pretentious Designer',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var jamie = Meteor.users.findOne(jamieId);

	var justinId = Meteor.users.insert({
		profile: { 
			name: 'Justin Childress',
			role: 'Designer',
			roleNickname: 'Pretentious Designer',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var justin = Meteor.users.findOne(justinId);

	var ashaunId = Meteor.users.insert({
		profile: { 
			name: 'Ashaun Eppes',
			role: 'Designer',
			roleNickname: 'Pretentious Designer',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var ashaun = Meteor.users.findOne(ashaunId);

	var mollyId = Meteor.users.insert({
		profile: { 
			name: 'Molly Valdez',
			role: 'Designer',
			roleNickname: 'Pretentious Designer',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var molly = Meteor.users.findOne(mollyId);


	// Create Nerd Commanders
	// ------------------------------------------------
	var bootsId = Meteor.users.insert({
		profile: { 
			name: 'Boots Highland',
			role: 'Web Developer',
			roleNickname: 'Nerd Commander',
			photo: 'self_portrait_gen.jpg' 
		}
	});
	var boots = Meteor.users.findOne(bootsId);

	var cameronId = Meteor.users.insert({
		profile: { 
			name: 'Cameron Scroggins',
			role: 'Web Developer',
			roleNickname: 'Nerd Commander',
			photo: 'self_portrait_gen.jpg' 
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

	var usersArray = new Array(
								matt,
								boots,
								cameron,
								kelsey,
								melissa,
								katie,
								glen,
								kimi,
								jamie,
								justin,
								ashaun,
								molly
							);

	var projectArray = new Array(stuffedEmailId, stuffedWebId);

	var string = "Veniam Quis Nostrud Exerci Tation Ullamcorper Suscipit Lobortis Nisl Ut Aliquip Ex Ea Commodo Qui Nunc Nobis Videntur Parum Clari Fiant Sollemnes In Assum Typi Non Habent Claritatem Insitam Est Usus Per Seacula Quarta Decima Et Quinta Decima Eodem Modo Typi Mutationem Consuetudium Lectorum Mirum Est Notare Quam Littera Te Feugait Nulla Facilisi Nam Liber Tempor Cum Soluta Nobis Eleifend Option Congue Nihil Legunt Saepius Claritas Est Etiam Processus Dynamicus Qui Sequitur Gothica Quam Mazim Placerat Facer Possim Legentis In Iis Qui Facit Eorum Qui Blandit Praesent Luptatum Zzril Delenit Augue Duis Dolore Consectetuer Adipiscing Elit Sed Diam Nonummy Nibh Euismod Tincidunt Ut Laoreet Dolore Magna Aliquam Erat Volutpat";
	var wordsArray = string.split(" ");

	for (var i=0; i<100; i++) {

		var randomUser = Math.floor(Math.random() * (usersArray.length - 1 + 1));
		var randomProject = Math.floor(Math.random() * (projectArray.length - 1 + 1));

		// find title
		var randomTitleLength = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
		var title = "";    

		for (var j=0; j<randomTitleLength; j++) {
			var ran = Math.floor(Math.random() * wordsArray.length);
			title += wordsArray[ran] + " ";
		}

		var task = Tasks.insert ({
			projectId: projectArray[randomProject],
			userId: kelsey._id,
			author: kelsey.profile.name,
			submitted: now - i * 3600 * 1000,
			dueDate: now + (i+1) * 3600 * 1000,
			title: title,
			assignedTo: usersArray[randomUser]._id,
			status: 'active',
			comments: 0
		});

	}

}