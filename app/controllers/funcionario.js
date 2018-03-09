module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.listar(function(error, funcionarios){
        connection.end();
        if( error ) {
            res.render('funcionarioListar', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {}, sessao: req.session.usuario });
            return;
        }
        res.render('funcionarioListar', { validacao : {}, funcionarios : funcionarios, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var tipoFuncionario = new application.app.models.TipoFuncionarioDAO(connection);
    
    tipoFuncionario.listar(function(error, tiposFuncionarios){
        connection.end();
        if( error ) {
            res.render('funcionarioListar', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {}, tiposFuncionarios:{}, sessao: req.session.usuario });
            return;
        }
        res.render('funcionarioEditar', { validacao : {}, funcionarios : {}, tiposFuncionarios: tiposFuncionarios, sessao: req.session.usuario });
    });    
}

module.exports.editar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);

    var connection = application.config.dbConnection();
    var tipoFuncionarioDao = new application.app.models.TipoFuncionarioDAO(connection);
    
    
    funcionarioDao.editar( req.params._id, function(error, funcionarios){
        if( error ) {
            res.render('funcionario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], funcionarios : {}, sessao: req.session.usuario });
            return;
        }
    
        tipoFuncionarioDao.listar(function(error, tipoFuncionarios){
            connection.end();
            if( error ) {
                res.render('funcionario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], funcionarios : {}, sessao: req.session.usuario });
                return;
            }
            res.render('funcionarioEditar', { validacao : {}, funcionarios : funcionarios, tiposFuncionarios: tipoFuncionarios, sessao: req.session.usuario });
        });
        
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.excluir( req.params._id, function(error, grupos){
        connection.end();
        if( error ) {
            res.render('funcionario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/funcionario");
    });
}

module.exports.salvar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var dadosForms = req.body;
    req.assert('cpf', 'Cpf é obrigatório').notEmpty();
    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();

    if(erros){
      
        res.render('funcionarioEditar', { validacao : erros, funcionarios : {}, tiposFuncionarios: {}, sessao: req.session.usuario });
        return;
    }
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);        
    
    funcionarioDao.salvar(dadosForms, function(error, funcionarios){
        connection.end();   
        if( error ) {
            res.render('funcionarioEditar', { validacao : [ {'msg': error }], funcionarios : funcionarios, tiposFuncionarios: {}, sessao: req.session.usuario });
            return;
        }
        res.redirect('/funcionario');
    });
     
}