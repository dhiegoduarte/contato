// config/config.js
console.log('config/config.js');//, new Date(new Date().getTime()).toString());

module.exports = function() {
	return require('./env/' + process.env.NODE_ENV + '.js');
}