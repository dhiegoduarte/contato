// app/models/Usuario.js
console.log('app/models/Usuario.js');//, new Date(new Date().getTime()).toString());

var mongoose = require('mongoose');

// importando o plugin
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());
	
	var schema = mongoose.Schema({
		login: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		nome: {
			type: String,
			required: true,
		},
		inclusao: {
			type: Date,
			default: Date.now
		}
	});
	schema.plugin(findOrCreate);
	return mongoose.model('Usuario', schema);
};