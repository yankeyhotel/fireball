Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('clients'); }
});

Router.map(function(){
	this.route('clientsList', { path: '/'} );
	this.route('clientPage', { 
		path: '/client/:_id',
		data: function() { return Clients.findOne(this.params._id); }
	});
});