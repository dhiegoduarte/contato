// contatooh/Gruntfile.js
// module.exports = function(grunt) {
	
// 	grunt.initConfig({
// 		// copia projeto para a pasta dist
// 		// copy: {
// 		// 	project: {
// 		// 		expand: true,
// 		// 		cwd: '.',
// 		// 		src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
// 		// 		dest: 'dist'
// 		// 	}
// 		// },
// 		// // limpa pasta dist
// 		// clean: {
// 		// 	dist: {
// 		// 		src: 'dist'
// 		// 	}
// 		// },
// 	// 	usemin : {
// 	// 		html: 'dist/app/views/**/*.ejs'
// 	// 	},
	
// 	// Você lembra de que os arquivos definidos nos metadados da página são criados relativamente à localização da página? Isso fará
// 	// com que sejam criados indevidamente em contatooh/dist/app/views . Como eles não estão dentro da página pública, a página carregada no navegador não conseguirá
// 	// baixá-los. Podemos resolver isso indicando para a task useminPrepare , aquela que cria nossos arquivos, que crie os arquivos dentro da
// 	// pasta contatooh/dist/public , passando um target que, na verdade, age como um objeto de configuração interna da task:
// 	// // 	useminPrepare: {
// 	// 		options: {
// 	// 			root: 'dist/public',
// 	// 			dest: 'dist/public'
// 	// 		},
// 	// 		html: 'dist/app/views/**/*.ejs'
// 	// 	},

// 	// Prepara o código para que a injeção de dependencia do angular q é feita baseada no nome dos parametros não seja alterada com o processo de minificação
// 	// 	ngAnnotate: {
// 	// 		scripts: {
// 	// 			expand: true,
// 	// 			src: ['dist/public/js/**/*.js']
// 	// 		}
// 	// 	}
// 	// });

	
// 	usemin : {
// 		html: 'app/views/**/*.ejs'
// 	},
// 	useminPrepare: {
// 		options: {
// 			root: 'public',
// 			dest: 'public'
// 		},
// 		html: 'app/views/**/*.ejs'
// 	},
// 	ngAnnotate: {
// 		scripts: {
// 			expand: true,
// 			src: ['public/js/**/*.js']
// 		},
// 	}
// });

// 	// Grunt permite registrar novas tasks que funcionam como uma espécie de atalho. Quando
// 	// ela for chamada, automaticamente outras tasks serão chamadas

// 	// grunt.registerTask('default', ['dist', 'minifica']);
// 	// grunt.registerTask('dist', ['clean', 'copy']);


// 	// 1. useminPrepare : lê os metadados das páginas e cria as
// 	// configurações para as tasks concat , uglify e cssmin .
// 	// 2. concat : concatena os arquivos .js e .css utilizando
// 	// como nome do arquivo a configuração gerada por
// 	// useminPrepare .
// 	// 3. uglify : minifica scripts com base na configuração gerada
// 	// por useminPrepare .
// 	// 4. cssmin : minifica arquivos CSS com base na configuração
// 	// gerada por useminPrepare .
// 	// 5. usemin : por fim, altera o HTML para que aponte para os
// 	// arquivos concatenados e minificados.

// 	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);

// 	// carregamento de plugins do Grunt
// 	// grunt.loadNpmTasks('grunt-contrib-copy');
// 	// grunt.loadNpmTasks('grunt-contrib-clean');
// 	grunt.loadNpmTasks('grunt-contrib-concat');
// 	grunt.loadNpmTasks('grunt-contrib-uglify');
// 	grunt.loadNpmTasks('grunt-contrib-cssmin');
// 	grunt.loadNpmTasks('grunt-usemin');
// 	grunt.loadNpmTasks('grunt-ng-annotate');
// };

module.exports = function(grunt) {
	grunt.initConfig({
		// copia projeto para a pasta dist
		copy: {
			project: {
				expand: true,
				cwd: '.',
				src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
				dest: 'dist'
			}
		},
		// limpa pasta dist
		clean: {
			dist: {
				src: 'dist'
			}
		},
		usemin : {
			html: 'dist/app/views/**/*.ejs'
		},
		useminPrepare: {
			options: {
				root: 'dist/public',
				dest: 'dist/public'
			},
			html: 'dist/app/views/**/*.ejs'
		},
		ngAnnotate: {
			scripts: {
				expand: true,
				src: ['dist/public/js/**/*.js']
			}
		}
	});
	
	grunt.registerTask('default', ['dist', 'minifica']);
	grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-ng-annotate');
};




// TODO DHIEGO 
// Para rodar no Travis deve ser comentado o codigo acima e descomentado o codigo abaixo

// module.exports = function(grunt) {
// 	grunt.initConfig({
		
// 	usemin : {
// 		html: 'app/views/**/*.ejs'
// 	},
// 	useminPrepare: {
// 		options: {
// 			root: 'public',
// 			dest: 'public'
// 		},
// 		html: 'app/views/**/*.ejs'
// 	},
// 	ngAnnotate: {
// 		scripts: {
// 			expand: true,
// 			src: ['public/js/**/*.js']
// 		},
// 	}
// });
// 	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);
// 	grunt.loadNpmTasks('grunt-contrib-concat');
// 	grunt.loadNpmTasks('grunt-contrib-uglify');
// 	grunt.loadNpmTasks('grunt-contrib-cssmin');
// 	grunt.loadNpmTasks('grunt-usemin');
// 	grunt.loadNpmTasks('grunt-ng-annotate');
// };