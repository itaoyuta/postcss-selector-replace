var postcss = require('postcss');
var replace = require('./lib/replace');

module.exports = postcss.plugin('postcss-selector-symbol-replace', replace);
