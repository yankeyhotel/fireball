
// set the checked status on sets of radio buttons.
// check the this.status against a string
// i.e. {{checked_eq status 'active'}}
Handlebars.registerHelper('checked_eq', function(x, y){
	if (x === y){
		return ' checked="checked"';
	} else {
		return '';
	}
});



// use moment to format the date
// http://stackoverflow.com/questions/18580495/format-a-date-from-inside-a-handlebars-template-in-meteor
// use http://momentjs.com/docs/ to create more formats
var DateFormats = {
		short: "MMM. DD, YYYY",
		long: "dddd DD.MM.YYYY HH:mm",
		datepicker: "MM/DD/YYYY hh:mm A",
		datepickerLong: "MMM. DD, YYYY hh:mm A",
};

Handlebars.registerHelper("formatDate", function(datetime, format) {
	if (moment) {
		f = DateFormats[format];
		return moment(datetime).format(f);
	} else {
		return datetime;
	}
});



// Use a block helper to sort out user lists
// http://handlebarsjs.com/
Handlebars.registerHelper("userListById", function(items, options) {
	var out = "<ul>";
	for(var i=0, l=items.length; i<l; i++) {
		var user = Meteor.users.findOne({_id: items[i]});
		out = out + "<li>" + user.profile.name + "</li>";
	}
	out += "</ul>";
	return out;
});


// Use a block helper to sort out user lists
// http://handlebarsjs.com/
Handlebars.registerHelper("userSelectById", function(items, options) {
	var out = "";
	for(var i=0, l=items.length; i<l; i++) {
		var user = Meteor.users.findOne({_id: items[i]});
		out = out + "<option value="+ user._id +">" + user.profile.name + "</option>";
	}
	return out;
});
