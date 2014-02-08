Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('clients'); }
});

Router.map(function(){

	// client list
	this.route('clientsList', { path: '/'} );

	// single client page
	this.route('clientPage', { 
		path: '/client/:_id',
		data: function() { return Clients.findOne(this.params._id); }
	});

	// add a client
	this.route('clientSubmit', {
		path: '/client-submit'
	});

	// edit a client
	this.route('clientEdit', {
		path: '/client/:_id/edit',
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
Router.before(requireLogin, {only: 'clientSubmit'});