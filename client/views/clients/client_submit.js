Template.clientSubmit.events ({
	'submit form': function(e) {
		e.preventDefault();

		var client = {
			title: 	$(e.target).find('[name=title]').val(),
			status: $(e.target).find('[name=status]').val()
		}

		client._id = Clients.insert(client);
		Router.go('clientPage', client);

	}
});