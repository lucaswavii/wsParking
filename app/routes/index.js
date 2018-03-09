module.exports = function(application){
  application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.get('/index', function(req, res){		
		application.app.controllers.index.index(application, req, res);
	});

	application.get('/login', function(req, res){
		application.app.controllers.index.login(application, req, res);
	});

	application.post('/alterarSenha', function(req, res){
		application.app.controllers.index.alterarSenha(application, req, res);
	});

	application.get('/envioSenha', function(req, res){
		application.app.controllers.index.envioSenha(application, req, res);
	});

	application.post('/esqueci', function(req, res){
		application.app.controllers.index.esqueci(application, req, res);
	});
	
	application.get('/logout', function(req, res){
		application.app.controllers.index.logout(application, req, res);		
  	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.index.autenticar(application, req, res);
	});

}