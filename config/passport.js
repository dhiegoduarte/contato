// config/passport.js
console.log('config/passport.js');//, new Date(new Date().getTime()).toString());

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

var config = require('./config')();

module.exports = function() {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());
	
	var Usuario = mongoose.model('Usuario');
	var githubCallback = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';

	// console.log('githubCallback',githubCallback);

	passport.use(new GitHubStrategy({
		// clientID: 'fae20a81a810fc1c4453',
		// clientSecret: '1c01e238e72c68d67e4d5834a6a55b4ec29ff438',

		clientID: config.clientID,
		clientSecret: config.clientSecret,
		// callbackURL: 'http://localhost:3000/auth/github/callback'
		callbackURL: githubCallback

	}, 
	// callback que será chamado apenas uma vez quando o usuário se autenticar
	function(accessToken, refreshToken, profile, done) {
		console.log('config/passport.js - function(accessToken, refreshToken, profile, done)');//, new Date(new Date().getTime()).toString());
		Usuario.findOrCreate(
			{ "login" : profile.username},
			{ "nome" : profile.username},
			function(erro, usuario) {
				if(erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		)}));

	/*
	Chamado apenas UMA vez e recebe o usuário do nosso
	banco disponibilizado pelo callback da estratégia de
	autenticação. Realizará a serialização apenas do
	ObjectId do usuário na sessão.
	*/
	passport.serializeUser(function(usuario, done) {
		console.log('config/passport.js - passport.serializeUser');//, new Date(new Date().getTime()).toString());
		done(null, usuario._id);
	});

	// Em cada requisição, o Passport chamará sua função de
	// desserialização passando como parâmetro o ObjectId do usuário
	// armazenado na sessão. Usaremos essa informação para buscar o
	// usuário no banco,
	passport.deserializeUser(function(id, done) {
		console.log('config/passport.js - passport.deserializeUser');//, new Date(new Date().getTime()).toString());
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};