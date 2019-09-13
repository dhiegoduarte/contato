// app/routes/contato.js
console.log('app/routes/contato.js');//, new Date(new Date().getTime()).toString());

function verificaAutenticacao(req, res, next) {
	console.log('app/routes/contato.js - verificaAutenticacao');
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado!');
	}
}

module.exports = function(app) {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());

	var controller = app.controllers.contato;
	
	// modo antigo de realizar as rotas
	// app.get('/contatos', controller.listaContatos);
	// app.get('/contatos/:id', controller.obtemContato);
	// app.delete('/contatos/:id', controller.removeContato);

	// Sem autenticacao
	app.route('/contatos')
	.get(controller.listaContatos)
	.post(controller.salvaContato);
	
	app.route('/contatos/:id')
	.get(controller.obtemContato)
	.delete(controller.removeContato);

	// Você já deve ter percebido que rotas do Express também são middlewares e que a ordem faz toda a diferença.

	// Com autenticacao
	// app.route('/contatos')
	// .get(verificaAutenticacao, controller.listaContatos)
	// .post(verificaAutenticacao, controller.salvaContato);
	
	// app.route('/contatos/:id')
	// .get(verificaAutenticacao, controller.obtemContato)
	// .delete(verificaAutenticacao, controller.removeContato);
};