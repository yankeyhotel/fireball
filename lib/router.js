Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [	
					Meteor.subscribe('allUsers'),
					Meteor.subscribe('notifications')
				];
	}
});

Router.map(function(){

	/* 
	 * ....................................................
	 * CLIENTS
	 * ....................................................
	 * Clients are edited inline using x-editable
	 * New Clients are submitted through a modal form
	 * ....................................................
	 */

		// client list (active clients)
		this.route('clientsList', { 
			path: 'clients',
			waitOn: function() {
				return Meteor.subscribe('clientsActive');
			}
		});

		// freezer list (archived clients)
		this.route('freezerList', {
			path: 'clients/freezer',
			waitOn: function() {
				return Meteor.subscribe('clientsArchived');
			}
		})

		// single client page
		this.route('clientPage', { 
			path: '/client/:_id',
			waitOn: function() {
				return [
							Meteor.subscribe('clientSingle', this.params._id),
							Meteor.subscribe('projectsByClient', this.params._id)
						];
			},
			data: function() { 
				return Clients.findOne(this.params._id); 
			}
		});


	/* 
	 * ....................................................
	 * PROJECTS
	 * ....................................................
	 * ....................................................
	 */

	// single client page
	this.route('projectPage', { 
		path: '/project/:_id',
		waitOn: function() {
			return [Meteor.subscribe('projectsPage', this.params._id), Meteor.subscribe('tasks', this.params._id)];
		},
		data: function() { 
			return Projects.findOne(this.params._id); 
		}
	});

	// add a project
	this.route('projectSubmit', {
		path: '/project-submit/:_id',
		data: function() { return Clients.findOne(this.params._id); }
	});


	/* 
	 * Me
	 * .....................................................
	 */

	 // My ToDos
	this.route('me', { 
		path: '/',
		waitOn: function() {
			return Meteor.subscribe('tasksByUser', Meteor.userId());
		},
		data: function() {
			var userId = Meteor.userId();
			return Tasks.find({userId: userId});
		}
	});

	// single user page
	this.route('switcharoo', { 
		path: '/switcharoo/:_id',
		waitOn: function() {
			return Meteor.subscribe('tasksByUser', this.params._id);
		},
		data: function() {
			// var userId = this.params._id;
			// return Tasks.find({userId: this.params._id});
			return Meteor.users.findOne({_id: this.params._id});
		}
	});


});


// require a login
var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTempalte);
		} else {
			this.render('accessDenied');
		}
		this.stop();
	}
}

Router.before(requireLogin, {only: ['clientSubmit', 'clientEdit'] });
Router.before(function() { Errors.clearSeen(); });














