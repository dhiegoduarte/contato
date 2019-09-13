// public/js/controllers/ContatoController.js
console.log('public/js/controllers/ContatoController.js');//, new Date(new Date().getTime()).toString());

angular.module('contatooh').controller('ContatoController',
	function($scope, $routeParams, Contato) {
	// function($scope, $routeParams, $http, $resource) {

		console.log("public/js/controllers/ContatoController.js - angular.module('contatooh').controller('ContatoController')");//, new Date(new Date().getTime()).toString());

		// var Contato = $resource('/contatos/:id');
		// console.log('Contato', Contato); 
		// console.log('typeof Contato', typeof Contato); 

		// Se tem o contatoId como parametro é pq esta editando um contato selecionado da lista, senão,
		// cria um novo obj Contato que será adicionado
		if($routeParams.contatoId) {
			console.log('public/js/controllers/ContatoController.js - if $routeParams.contatoId.');//, new Date(new Date().getTime()).toString());
			console.log('Vou chamar o /contatos/:id');//, new Date(new Date().getTime()).toString());
			Contato.get({id: $routeParams.contatoId},
				function(contato) {
					// console.log('contato', contato); 
					$scope.contato = contato;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o contato.'
					};
					console.log(erro);
				}
			);
		} else {
			$scope.contato = new Contato();
		}

		$scope.salva = function() {
			console.log('public/js/controllers/ContatoController.js - $scope.salva');//, new Date(new Date().getTime()).toString());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/contatos os dados do contato. $resource não dá suporte a PUT. 
			$scope.contato.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso'};
					// limpa o formulário
					$scope.contato = new Contato();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('contatoSalvo');
		};

		// Para popular o combo de contatos de emergencia
		Contato.query(function(contatos) {
			console.log('public/js/controllers/ContatoController.js - Contato.query(function(contatos)');//, new Date(new Date().getTime()).toString());
			$scope.contatos = contatos;
		});

});