module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar(function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupoListar', { validacao : [ {'msg': error.sqlMessage }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('grupoListar', { validacao : {}, grupos : grupos, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('grupoEditar', { validacao : {}, grupos : {} , sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.editar( req.params._id, function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupoEditar', { validacao : [ {'msg': error.sqlMessage }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('grupoEditar', { validacao : {}, grupos : grupos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.excluir( req.params._id, function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupo', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/grupo");
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
      
        res.render('grupoEditar', {validacao: erros,  empresas: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);        
    var moduloDao = new application.app.models.ModuloDAO(connection);        
    
    grupoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('grupoEditar', { validacao : [ {'msg': error.sqlMessage }], grupos : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/grupo');
    });
}