module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var corDao = new application.app.models.CorDAO(connection);
    
    corDao.listar(function(error, cores){
        connection.end();
        if( error ) {
            res.render('coresListar', { validacao : [ {'msg': error.sqlMessage }], cores : {}, sessao: req.session.usuario });
            return;
        }
        res.render('coresListar', { validacao : {}, cores : cores, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('coresEditar', { validacao : {}, cores : {} , sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var corDao = new application.app.models.CorDAO(connection);
    
    corDao.editar( req.params._id, function(error, cores){
        connection.end();
        if( error ) {
            res.render('coresEditar', { validacao : [ {'msg': error.sqlMessage }], cores : {}, sessao: req.session.usuario });
            return;
        }
        res.render('coresEditar', { validacao : {}, cores : cores, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var corDao = new application.app.models.CorDAO(connection);
    
    corDao.excluir( req.params._id, function(error, cores){
        connection.end();
        if( error ) {
            res.render('cores', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], tipos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/cores");
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
      
        res.render('tiposEditar', {validacao: erros,  cores: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var corDao = new application.app.models.CorDAO(connection);        
    var moduloDao = new application.app.models.ModuloDAO(connection);        
    
    corDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('coresEditar', { validacao : [ {'msg': error.sqlMessage }], cores : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/cores');
    });
}