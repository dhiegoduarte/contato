// config/protractor.js
console.log('config/protractor.js');//, new Date(new Date().getTime()).toString());

var config = require('./config')();

exports.config = {
	// variaveis usadas nos testes e2e com Saucelabs
	sauceUser : config.sauceUser,
	sauceKey : config.sauceKey,
	capabilities : {
		'name': config.sauceTestName,
		'browserName': 'chrome',
		'tunnel-identifier': config.travisJobNumber,
		'build': config.travisBuild
	},

	specs: ['../test/e2e/**/*.js'],

// automatizar o processo de autenticação do usuário antes da execução de nossos testes.
// função que será chamada apenas uma vez antes da execução de nossas suítes de testes
// onPrepare: function() {
// 	browser.driver.get('http://localhost:3000').then(function() {
// 		browser.driver.findElement(by.id('entrar')).click();
		
// 			// utilizando o config.js
// 			browser.driver.findElement(by.id('login_field')).sendKeys(config.seleniumUser);
// 			browser.driver.findElement(by.id('password')).sendKeys(config.seleniumUserPassword);
// 			browser.driver.findElement(by.name('commit')).click();
// 		});
// }
};
