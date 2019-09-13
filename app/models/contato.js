// app/models/contato.js
console.log('app/models/contato.js');//, new Date(new Date().getTime()).toString());

var mongoose = require('mongoose');

module.exports = function() {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());
	
	var schema = mongoose.Schema({
		// Existem outros tipos como Number, Date, Boolean e Array,
		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		emergencia: {
			type: mongoose.Schema.ObjectId,
			ref: 'Contato'
		}
	});

	// Um Model é um objeto que corresponde a uma collection de nosso
	// banco e utiliza o Schema usado em sua criação para validar qualquer documento
	// que tenhamos na collection.
	// Na 1 vez (banco novo) uma collection com o nome passado abaixo (em lowercase e no plural) é criada
	return mongoose.model('Contato', schema);
};