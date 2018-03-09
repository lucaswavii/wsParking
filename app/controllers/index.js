module.exports.index = function(application, req, res){
	
	if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}

	var connection = application.config.dbConnection();
    var indexDao = new application.app.models.IndexDAO(connection);
    indexDao.listar(function(error, resultado){
		connection.end();
		res.render('index', { validacoes: {}, resultado: resultado, sessao: req.session.usuario });
	});	
}

module.exports.envioSenha = function(application, req, res){
	var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.listar(function(error, empresas){
		connection.end();
        if( error ) {
            res.render('envioSenha', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            return;
        }
        res.render('envioSenha', { validacao : {}, empresas : empresas });
    });
}
module.exports.alterarSenha = function(application, req, res){
	var dadosForms = req.body;
	var connection = application.config.dbConnection();
	var usuarioDao = new application.app.models.UsuarioDAO(connection);

	if( dadosForms.senha ) {
		usuarioDao.salvar(dadosForms, function(error, result){
			connection.end();
			res.redirect("index");
		});
	} else {
		res.redirect("index");	
	}
}

module.exports.esqueci = function(application, req, res){
    
	var dadosForm = req.body;
	req.assert('empresa' , 'Empresa não de ser vazio').notEmpty();
	req.assert('nome' , 'Usuario não de ser vazio').notEmpty();
	
	var erros = req.validationErrors();

	var connection = application.config.dbConnection();
	var usuariosDao = new application.app.models.UsuarioDAO(connection);
	var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
	var empresaDao = new application.app.models.EmpresaDAO(connection);
		
	if(erros){
    	empresaDao.listar(function(error, empresas){  
			connection.end();      	
        	res.render('envioSenha', { validacao : erros, empresas : empresas });
    	});   
    } else {
		usuariosDao.esqueci(dadosForm, function(error, usuarios ){
			if ( usuarios.length > 0 ) {
				
				usuarios[0].senha = Math.random().toString(36).slice(-10); // Senha Temporaria

				funcionarioDao.editar( usuarios[0].funcionario,function(error, funcionarios){
					
					
					var nodemailer = require('nodemailer');
					var transporte = nodemailer.createTransport({ service: 'gmail', auth: { user: "suporte@wavii.com.br", pass: "Wavii180279" } });
					var email = 
					{
						from: 'comercial@wavii.com.br', // Quem enviou este e-mail
						to: funcionarios[0].email, // Quem receberá
						subject: 'Lembrança de Senha',  // Um assunto bacana :-) 
						html: 'O usuário solicitou lembrança de senha:<br>' + "Usuário:" + usuarios[0].nome + "<br>Senha:" +  usuarios[0].senha // O conteúdo do e-mail
					};
					
					transporte.sendMail(email, function(err, info){
						if(err) {
							console.log(err)
						}
					});
					
					usuariosDao.salvar(usuarios[0], function(error, result){});
					empresaDao.listar(function(error, empresas){  
						connection.end();      	
						res.render('envioSenha', { validacao : [{'msg':'Senha enviada para o e-mail ' + funcionarios[0].email}], empresas : empresas });
					});   
				
				});


			} else {
				empresaDao.listar(function(error, empresas){ 
					connection.end();       	
					res.render('envioSenha', { validacao : [{'msg':'Usuário Não Encontrado.'}], empresas : empresas });
				});   
			}
		});
	}
}

module.exports.login = function(application, req, res){
	var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.listar(function(error, empresas){
		connection.end();
        if( error ) {
            res.render('login', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            return;
        }
        res.render('login', { validacao : {}, empresas : empresas });
    });
}

module.exports.logout = function(application, req, res){
	req.session.destroy();
	res.redirect("login")
}

module.exports.autenticar = function(application, req, res){
    
	var dadosForm = req.body;
	req.assert('empresa' , 'Empresa não de ser vazio').notEmpty();
	req.assert('nome' , 'Usuario não de ser vazio').notEmpty();
	req.assert('senha', 'Senha não de ser vazia').notEmpty();
	
	var erros = req.validationErrors();
	var connection = application.config.dbConnection();
    	
	if(erros){	
		var empresaDao = new application.app.models.EmpresaDAO(connection);    
    	empresaDao.listar(function(error, empresas){
			connection.end();
			if( error ) {
            	res.render('login', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            	return;
        	}
			res.render('login', { validacao : erros, empresas : empresas });
			return;
    	});	
	}
	
	var usuariosDao = new application.app.models.UsuarioDAO(connection);
	var indexDao = new application.app.models.IndexDAO(connection);
	var permissaoDao = new application.app.models.PermissaoDAO(connection);

	usuariosDao.autenticar(dadosForm, function(errors, usuarios){
		if(usuarios.length > 0 ) {
			req.session.usuario = usuarios[0];
			req.session.permissao = {};
			
			permissaoDao.editar( usuarios[0].grupo, function(error, permissoes){
				req.session.usuario.permissao = permissoes;
				var empresaDao = new application.app.models.EmpresaDAO(connection);    
				empresaDao.editar( usuarios[0].empresa, function(error, empresas){
					req.session.usuario.empresa = empresas[0];
					indexDao.listar(function(error, resultado){
						connection.end();					
						res.render('index', { validacoes: {}, resultado: resultado, sessao: req.session.usuario });
					});
				});
				
			});
		} else {

			var empresaDao = new application.app.models.EmpresaDAO(connection);    
    		empresaDao.listar(function(error, empresas){
				connection.end();
				if( error ) {
            		res.render('login', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            		return;
        		}
				res.render('login', { validacao : [{'msg': 'Usuário ou Senha inválido!'}], empresas : empresas });
				return;
    		});
		}					
	});	
}