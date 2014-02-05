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

	// admin page
	this.route('clientSubmit', {
		path: '/client-submit'
	});
    
});