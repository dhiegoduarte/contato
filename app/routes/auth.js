// app/routes/auth.js
console.log('app/routes/auth.js');//, new Date(new Date().getTime()).toString());

var passport = require('passport');

module.exports = function(app) {
	// console.log('module.exports');//, new Date(new Date().getTime()).toString());
	
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', {
		successRedirect: '/'
	}));

	app.get('/logout', function(req, res) {
		req.logOut(); // exposto pelo passport
		res.redirect('/');
	});

}