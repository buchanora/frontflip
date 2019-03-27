/* use strict */
const handlebars = require('handlebars');
module.exports = template => context => handlebars.compile(template)(context);
