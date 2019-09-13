// public/js/controllers/ContatosController.js
console.log('public/js/controllers/ContatosController.js');//, new Date(new Date().getTime()).toString());
// testando();

angular.module('contatooh').controller('ContatosController',
	function($scope, $routeParams, Contato) {
	// function($scope, $routeParams, $http, $resource) {

		console.log("public/js/controllers/ContatosController.js - angular.module('contatooh').controller('ContatosController')");//, new Date(new Date().getTime()).toString());

		$scope.contatos = [];

		// $scope.total = 0;
		
		$scope.filtro = '';

		$scope.mensagem = {texto: ''};
		
		function buscaContatos() {
			console.log('public/js/controllers/ContatosController.js - buscaContatos()');//, new Date(new Date().getTime()).toString());
			console.log('Vou chamar o /contatos');//, new Date(new Date().getTime()).toString());
			// var Contato = $resource('/contatos');
			// console.log('Contato', Contato); 
			Contato.query(
				function(contatos) {
					// console.log('contatos', contatos); 
					$scope.contatos = contatos;
				},
				function(erro) {
					$scope.mensagem = {texto: "Não foi possível obter a lista de contatos"};
					console.log(erro);
				}
			);
		}

		buscaContatos();

		$scope.remove = function(contato) {
			console.log('public/js/controllers/ContatosController.js - $scope.remove');//, new Date(new Date().getTime()).toString());
			console.log('Vou chamar o /contatos/:id');//, new Date(new Date().getTime()).toString());
			// var Contato = $resource('/contatos/:id');
			// console.log('Contato', Contato); 
			// var promise = Contato.delete({id: contato._id}).$promise;
			// promise
			// 	.then(buscaContatos)
			// 	.catch(function(erro) {
			// 		console.log("Não foi possível remover o contato");
			// 		console.log(erro);
			// 	});
			// console.log('contato', contato); 
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível remover o contato'};
					console.log(erro);
				}
			);
		};

});