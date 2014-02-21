
// set the checked status on sets of radio buttons.
// check the this.status against a string
// i.e. {{checked_eq status 'active'}}
Handlebars.registerHelper('checked_eq', function(x, y){
  if (x === y){
     return ' checked="checked"';
  }
  return ''
})