// public/js/directives/meus-componentes/meus-componentes.js
console.log('public/js/directives/meus-componentes/meus-componentes.js');//, new Date(new Date().getTime()).toString());

angular.module('meusComponentes', [])
.directive('meuPainel', function() {
	var directive = {};
	// podera ser usada como Elemento e Atributo
	// <!-- como (E)lemento -->
	// <meu-painel></meu-painel>
	// <!-- como (A)tributo -->
	// <div meu-painel></div>
	directive.restrict = "EA";

	// 	@ indica que o valor que receberemos será sempre uma
	// string, uma cópia do valor presente no atributo da diretiva em uso na view.
	directive.scope = {
		// titulo: '@titulo'
		// 		o atributo da diretiva na view é igual ao
		// nome da propriedade em nosso escopo isolado, podemos omitir o nome do
		// atributo deixando apenas @:
		titulo: '@'
	};

	// solicitar que ele mantenha o conteúdo do elemento, ou seja, o htm dentro do meu-painel. Se não colocar
	// essa propriedade, o AngularJS troca o fragmento do DOM onde colocamos o meu-painel por um novo, removendo 
	// todo o seu conteudo, mostrando um painel vazio. A diretiva ng-transclude deve ser adicionado no template da nossa
	// diretiva.
	directive.transclude = true;

	// directive.template =
	// 	'<div class="panel panel-default">' +
	// 		' <div class="panel-heading">' +
	// 			' <h3 class="panel-title">{{titulo}}</h3>' +
	// 		' </div>' +
	// 		' <div ng-transclude class="panel-body">' +
	// 		' </div>' +
	// 	'</div>';

	directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';

	return directive;
})

.directive('meuBotaoAviso', function() {
	var directive = {}
	
	directive.restrict = 'E';
	
	directive.scope = {
		nome : '@',
		// O modificador & nos permite avaliar ou invocar uma expressão (função) no escopo do elemento no qual a diretiva
		// está inserida.
		acao : '&'
	};
	
	directive.template =
		'<button ng-click="acao()" class="btn btn-warning">'
			+ '{{nome}}'
		+ '</button>';

	return directive;
})

// para essa diretiva funcionar, em public/js/controllers/ContatoController.js devera ser setado no escopo btnBackFocus = true.
.directive('meuFocus', function() {
	var directive = {};
	
	directive.restrict = 'A';
	
	directive.scope = {
		
		// Usamos focus: '=' no escopo isolado da diretiva. Este modificador permite que nossa diretiva obtenha do atributo focus o valor da expressão atribuída a ele, e
		// qualquer mudança realizada pela diretiva neste valor atualizará também o valor no escopo pai. Este modificador é uma espécie de two-way data binding, no
		// qual tanto o escopo pai quanto o escopo isolado da diretiva têm a mesma referência para a expressão. Se tivéssemos utilizado @ , o valor de focus seria sempre a
		// string "btnBackFocus" , e não o valor corrente da expressão.
		// focus: '='
		evento: '@'
	}
	
	// Os argumentos da função link são posicionais, não injeções. Se tivéssemos invertido os parâmetros no exemplo anterior, nosso código deixaria
	// de funcionar.
	// directive.link = function(scope, element) {
	// 	// $watch. gastamos poder computacional, sendo assim, devemos ser parcimoniosos com seu uso.
	// 	scope.$watch('focus', function() {
	// 		if (scope.focus) {
	// 			element[0].focus();
	// 			scope.focus = false;
	// 		}
	// 	});
	// };
	// return directive;

	// Trabalhando com event bus do AngularJS.
	directive.link = function(scope, element) {
		scope.$on(scope.evento, function() {
			element[0].focus();
		});
	};
	return directive;

});
