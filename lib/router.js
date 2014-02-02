Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('clients'); }
});

Router.map(function(){
	this.route('clientsList', {path: '/'});
});