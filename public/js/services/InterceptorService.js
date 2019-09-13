// public/js/services/InterceptorService.js
console.log('public/js/services/InterceptorService.js');//, new Date(new Date().getTime()).toString());

// O AngularJS permite plugar em sua infraestrutura interceptadores de requisições Ajax. Podemos interceptar 
// o envio ou recebimento de informações, Agora, vamos adicionar em nosso objeto a chave
// responseError que guarda a função que será chamada toda vez que $http ou $resource devolverem 
// uma resposta do servidor de erro. A ideia é usarmos o $location para processarmos a rota
// /auth apenas se o status da resposta for o erro 401 (não autorizado)
angular.module('contatooh').factory('meuInterceptor',
	function($location, $q) {
		console.log("public/js/services/InterceptorService.js - angular.module('contatooh').factory('meuInterceptor'");//, new Date(new Date().getTime()).toString());
		var interceptor = {
			responseError: function(resposta) {
				if (resposta.status == 401) {
					$location.path('/auth');
				}
				return $q.reject(resposta);
			}
		}
		return interceptor;
	});