// app/routes/index.js
console.log('app/routes/index.js');//, new Date(new Date().getTime()).toString());

module.exports = function(app) {
	// Primeira vez que chamar loalhost:300 vai cair nessa funcao. 
	app.get('/', function(req, res) {
		console.log("app/routes/index.js - app.get('/', function(req, res)");//, new Date(new Date().getTime()).toString());
		var login = '';
		if(req.user) {
			login = req.user.login;
		}

		// console.log('req', req);
		// renderiza e direcina para o index.ejs. No index vai executar o public/js/main.js que irá direcionar
		// para a rota default $routeProvider.otherwise({redirectTo: '/contatos'});
		res.render('index', { "usuarioLogado" : login});
	});
};