if (Meteor.isClient) {
	IronRouterProgress.configure
		spinner : true
}


Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() { 
		return [	
					Meteor.subscribe('clientsActive'),
					Meteor.subscribe('allUsers'),
					Meteor.subscribe('notifications')
				];
	}
});


Router.map(function(){

	/* 
	 * --------------------------------------------------------------------------------
	 * CLIENTS
	 * --------------------------------------------------------------------------------
	 * Clients are edited inline using x-editable
	 * New Clients are submitted through a modal form
	 * --------------------------------------------------------------------------------
	 * CLIENTS - Subscriptions
	 * All Active clients are loaded in at the initial startup, 
	 * Archived clients are ONLY loaded when you go to the 'freezerList' route and a 
	 * single archived page is loaded once you get to 'clientPageFreezer' route
	 * --------------------------------------------------------------------------------
	 */

		// client list (active clients)
		this.route('clientsList', { 
			path: 'clients'
		});

		// freezer list (archived clients)
		this.route('freezerList', {
			path: 'clients/freezer',
			waitOn: function() {
				return Meteor.subscribe('clientsArchived');
			}
		})

		// single client page - clientSingle
		this.route('clientPage', { 
			path: '/client/:_id',
			waitOn: function() {
				return Meteor.subscribe('projectsByClient', this.params._id);
			},
			data: function() { 
				return Clients.findOne(this.params._id); 
			}
		});

		// single archived client page
		this.route('clientPageFreezer', {
			path: '/client/freezer/:_id',
			template: 'clientPage',
			waitOn: function() {
				return [
					Meteor.subscribe('clientsSingle', this.params._id),
					Meteor.subscribe('projectsByClient', this.params._id)	
				]
			},
			data: function() {
				return Clients.findOne(this.params._id);
			}
		});


	/* 
	 * --------------------------------------------------------------------------------
	 * PROJECTS
	 * --------------------------------------------------------------------------------
	 * Projects are edited inline using x-editable
	 * New Projects are submitted through a modal form
	 * --------------------------------------------------------------------------------
	 * PROJECTS - Subscriptions
	 * --------------------------------------------------------------------------------
	 */

		// single client page
		this.route('projectPage', { 
			path: '/project/:clientId/:_id',
			waitOn: function() {
				return [ 
							Meteor.subscribe('clientsSingle', this.params.clientId),
							Meteor.subscribe('projectsSingle', this.params._id),
							// only subscripe to the current project's tasks
							Meteor.subscribe('tasksByProject', this.params._id)
						];
			},
			data: function() { 
				return Projects.findOne(this.params._id); 
			}
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


	// testings
	this.route("testings", {
		path: '/testings'
	})


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

// Router.onBeforeAction(requireLogin, {only: ['clientSubmit', 'clientEdit'] });
Router.onBeforeAction(function() { Errors.clearSeen(); });














