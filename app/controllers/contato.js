// app/controllers/contato.js
console.log("app/controllers/contato.js");//, new Date(new Date().getTime()).toString());

var sanitize = require('mongo-sanitize');

// Codigo comentado acima antes de usar o model com mongoose
module.exports = function (app) {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());
	
	// Guardamos uma referência para o Model na variável Contato iniciando
	// com letra maiúscula, uma convenção bastante utilizada para funções
	// construtoras. Essas funções permitem utilizar o operador new para criarmos
	// novas instâncias, objetos que representam nossos documentos.
	var Contato = app.models.contato; // Não precosa de require pq foi carregado pelo express-load

	var controller = {};
	
	controller.listaContatos = function(req, res) {
		console.log("app/controllers/contato.js - controller.listaContatos");
		// Precisa popular a referencia emergencia definida no schema do mongoose
		Contato.find().populate('emergencia').exec()
		.then(
			function(contatos) {
				res.json(contatos);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};
	
	controller.obtemContato = function(req, res) {
		console.log("app/controllers/contato.js - controller.obtemContato");
		var _id = req.params.id;
		Contato.findById(_id).exec()
		.then(function(contato) {
			if (!contato) throw new Error("Contato não encontrado");
			res.json(contato) ;
		},
		function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		}
		);
	};
	
	controller.removeContato = function(req, res) {
		console.log("app/controllers/contato.js - controller.removeContato");
		// var _id = req.params.id;
		// sanitizando requisicao com o mongo-sanitize para evitar query selector injection. Ex: passar "$ne" : null no lugar do id, o que
		//resultaria na remoçãod e todos os registros
		var _id = sanitize(req.params.id);
		// Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o contato
		// removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função remove foi utilizada.
		Contato.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.status(204).end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};
	
	controller.salvaContato = function(req, res) {
		console.log("app/controllers/contato.js - controller.salvaContato");
		var _id = req.body._id;
		/*
		Independente da quantidade de parâmetros,
		apenas selecionamos o nome, email e emergencia. Evita pegar alguma informaçã maliciosa que foi injetada na requisição
		*/
		var dados = {
			"nome" : req.body.nome,
			"email" : req.body.email,
			"emergencia" : req.body.emergencia || null
		};
		
		// testando por undefined
		// req.body.emergencia = req.body.emergencia || null;

		if(_id) {
			// Contato.findByIdAndUpdate(_id, req.body).exec()
			Contato.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(contato) {
					res.json(contato);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Contato.create(dados)
			.then(
				function(contato) {
					res.status(201).json(contato);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
				);
		}
	};
	// console.log(typeof controller);
	return controller;

// Contato.find()
// .select("nome email")
// .exec();

// Contato.find()
// .select("nome email")
// .where("email").equals(/cont/)
// .exec()
// .then(function(nomeEhEmail) {
// console.log(nomeEhEmail);
// });



};