module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var tipoFuncionarioDao = new application.app.models.TipoFuncionarioDAO(connection);
    
    tipoFuncionarioDao.listar(function(error, tipoFuncionarios){
        connection.end();
        if( error ) {
            res.render('tipoFuncionarioListar', { validacao : [ {'msg': error.sqlMessage }], tipoFuncionarios : {}, sessao: req.session.usuario });
            return;
        }
        res.render('tipoFuncionarioListar', { validacao : {}, tipoFuncionarios : tipoFuncionarios, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('tipoFuncionarioEditar', { validacao : {}, tipoFuncionarios : {}, sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var tipoFuncionarioDao = new application.app.models.TipoFuncionarioDAO(connection);
    
    tipoFuncionarioDao.editar( req.params._id, function(error, tipoFuncionarios){
        connection.end();
        if( error ) {
            res.render('tipoFuncionarioEditar', { validacao : [ {'msg': error.sqlMessage }], tipoFuncionarios : {}, sessao: req.session.usuario });
            return;
        }
        res.render('tipoFuncionarioEditar', { validacao : {}, tipoFuncionarios : tipoFuncionarios, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var tipoFuncionarioDao = new application.app.models.TipoFuncionarioDAO(connection);
    
    tipoFuncionarioDao.excluir( req.params._id, function(error, tipoFuncionarios){
        connection.end();
        if( error ) {
            res.render('tipoFuncionario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], tipoFuncionarios : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/tipoFuncionario");
    });
}

module.exports.salvar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
      
        res.render('tipoFuncionarioEditar', {validacao: erros,  tipoFuncionarios: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var tipoFuncionarioDao = new application.app.models.TipoFuncionarioDAO(connection);        
    
    tipoFuncionarioDao.salvar(dadosForms, function(error, result){
        connection.end();    
        if( error ) {
            res.render('tipoFuncionarioEditar', { validacao : [ {'msg': error.sqlMessage }], tipoFuncionarios : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/tipoFuncionario');
    });
     
}