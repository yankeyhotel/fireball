
// set the checked status on sets of radio buttons.
// check the this.status against a string
// i.e. {{checked_eq status 'active'}}
Handlebars.registerHelper('checked_eq', function(x, y){
  if (x === y){
     return ' checked="checked"';
  }
  return ''
});



// use moment to format the date
// http://stackoverflow.com/questions/18580495/format-a-date-from-inside-a-handlebars-template-in-meteor
// use http://momentjs.com/docs/ to create more formats
var DateFormats = {
		short: "MMMM DD, YYYY",
		long: "dddd DD.MM.YYYY HH:mm"
};

Handlebars.registerHelper("formatDate", function(datetime, format) {
	if (moment) {
		f = DateFormats[format];
		return moment(datetime).format(f);
	} else {
		return datetime;
	}
});