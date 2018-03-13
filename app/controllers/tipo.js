module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.listar(function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tiposListar', { validacao : [ {'msg': error.sqlMessage }], tipos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('tiposListar', { validacao : {}, tipos : tipos, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('tiposEditar', { validacao : {}, tipos : {} , sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.editar( req.params._id, function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tiposEditar', { validacao : [ {'msg': error.sqlMessage }], tipos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('tiposEditar', { validacao : {}, tipos : tipos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.excluir( req.params._id, function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tipos', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], tipos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/tipos");
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
      
        res.render('tiposEditar', {validacao: erros,  tipos: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);        
    var moduloDao = new application.app.models.ModuloDAO(connection);        
    
    tipoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('tiposEditar', { validacao : [ {'msg': error.sqlMessage }], tipos : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/tipos');
    });
}