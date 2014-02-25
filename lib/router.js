Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('clients'), Meteor.subscribe('allUsers')];
	}
});

Router.map(function(){

	/* 
	 * CLIENTS
	 * .....................................................
	 */

	// client list
	this.route('clientsList', { path: '/'} );

	// single client page
	this.route('clientPage', { 
		path: '/client/:_id',
		waitOn: function() {
			return Meteor.subscribe('projects', this.params._id);
		},
		data: function() { 
			return Clients.findOne(this.params._id); 
		}
	});

	// edit a client
	this.route('clientEdit', {
		path: '/client/:_id/edit',
		data: function() { return Clients.findOne(this.params._id); }
	});

	// add a client
	this.route('clientSubmit', {
		path: '/client-submit'
	});


	/* 
	 * PROJECTS
	 * .....................................................
	 */

	// single client page
	this.route('projectPage', { 
		path: '/project/:_id',
		waitOn: function() {
			return Meteor.subscribe('projectsPage', this.params._id);
		},
		data: function() { 
			return Projects.findOne(this.params._id); 
		}
	});

	// edit a project
	// this.route('projectEdit', {
	// 	path: '/project/:_id/edit',
	// 	data: function() { return Clients.findOne(this.params._id); }
	// });

	// add a project
	this.route('projectSubmit', {
		path: '/project-submit/:_id',
		data: function() { return Clients.findOne(this.params._id); }
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














