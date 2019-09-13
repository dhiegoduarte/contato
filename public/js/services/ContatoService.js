// public/js/services/ContatoService.js
console.log('public/js/services/ContatoService.js');//, new Date(new Date().getTime()).toString());

// Utilizando a instância de nosso módulo principal, utilizamos a função
// factory, que recebe como primeiro parâmetro o nome do serviço e, no segundo,
// a função que o define.
// serviço criado com factory deve retornar um objeto.
angular.module('contatooh').factory('Contato',
	function($resource) {
		console.log("public/js/services/ContatoService.js - angular.module('contatooh').factory");//, new Date(new Date().getTime()).toString());
		// console.log('$resource',$resource);
		return $resource('/contatos/:id');
	});