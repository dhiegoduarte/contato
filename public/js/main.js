// public/js/main.js
console.log('public/js/main.js');//, new Date(new Date().getTime()).toString());

// angular.module('contatooh', []);

// adicionando modulos como dependencia do principal (rotas, resource etc)
angular.module('contatooh', ['ngRoute','ngResource','meusComponentes'])
	.config(function($routeProvider, $httpProvider) {

		console.log("public/js/main.js - angular.module('contatooh', ['ngRoute','ngResource','meusComponentes'])");//, new Date(new Date().getTime()).toString());

		// O AngularJS permite plugar em sua infraestrutura
		// interceptadores de requisições Ajax. Podemos interceptar o envio
		// ou recebimento de informações,
		$httpProvider.interceptors.push('meuInterceptor');
		
		// Um ponto importante é que toda rota configurada por $routeProvider para ser disparada deve 
		// ser acessada através da URL da página principal adicionando o prefixo #, o famoso hash. 
		// Por exemplo: http://localhost:3000/index.html#/contatos ou http://localhost:3000/#/contatos.
		// A URL http://localhost:3000/contatos acessa a rota do lado do servidor, definida em app/routes/contato.js
		$routeProvider.when('/contatos', {
			templateUrl: 'partials/contatos.html',
			controller: 'ContatosController'
		});

		$routeProvider.when('/contato/:contatoId', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/contato', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/auth', {
			templateUrl: 'partials/auth.html'
		});

		
		$routeProvider.otherwise({redirectTo: '/contatos'});
	
});

// escopo global, pode ser acessado por outros scripts js
// function testando() {
// 	var teste = "Declarado no script main e chamado no Controller pq esta em escopo global!!!";
// 	console.log(teste);
// }