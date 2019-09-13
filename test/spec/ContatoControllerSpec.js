// test/spec/ContatoControllerSpec.js
console.log('test/spec/ContatoControllerSpec.js');//, new Date(new Date().getTime()).toString());

describe("ContatoController", function() {
	var $scope, $httpBackend;

	// O Jasmine possui a função beforeEach sempre chamada
	// antes da execução de cada uma de nossas Specs	
	beforeEach(function() {
		module('contatooh');
		// Internamente, o sistema de injeção removerá os underlines para que nosso código funcione. Se não tivéssemos feito isso,
		// teríamos problemas em associar o $httpBackend recebido como
		// parâmetro com a variável declarada de mesmo nome.
		// A pergunta que você deve estar se fazendo é o motivo de não
		// termos adotado outro nome de variável no lugar de
		// $httpBackend , removendo assim a necessidade dos underlines
		// do parâmetro injetado. A razão é simples: queremos usar os
		// mesmos nomes dos artefatos do AngularJS em nossos testes.
		inject(function($injector, _$httpBackend_) {
			// inject(function($injector) {
			$scope = $injector.get('$rootScope').$new();
			
			//Para mockarmos nosso back-end, ou seja, mockar os REST Endpoints
			$httpBackend = _$httpBackend_; 
			$httpBackend.when('GET', '/contatos/1').respond({_id: '1'});
			$httpBackend.when('GET', '/contatos').respond([{}]);
		});
	});
	
	it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado", //linha 32 deo controller ContatoController
		inject(function($controller) {
			$controller('ContatoController',
				{"$scope" : $scope});
			expect($scope.contato._id).toBeUndefined();
		}));

	it("Deve preencher o Contato quando parâmetro de rota for passado", //linha 16 deo controller ContatoController
		inject(function($controller) {
			$controller('ContatoController', {
				// '$routeParams': {contatoId: '598858239373c0c268457552'}, 
				'$routeParams': {contatoId: 1}, 
				'$scope': $scope
			});
			// Resolver os endpoints mockados
			$httpBackend.flush();
			expect($scope.contato._id).toBeDefined();
		}));
});