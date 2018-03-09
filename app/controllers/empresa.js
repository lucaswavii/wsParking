module.exports.index = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.listar(function(error, empresas){
        connection.end();
        if( error ) {
            res.render('empresaListar', { validacao : [ {'msg': error.sqlMessage }], empresas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('empresaListar', { validacao : {}, empresas : empresas, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('empresaEditar', { validacao : {}, empresas : {}, sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.editar( req.params._id, function(error, empresas){
        connection.end();
        if( error ) {
            res.render('empresaEditar', { validacao : [ {'msg': error.sqlMessage }], empresas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('empresaEditar', { validacao : {}, empresas : empresas, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.excluir( req.params._id, function(error, empresas){
        connection.end();
        if( error ) {
            res.render('empresa', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], empresas : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/empresa");
    });
}

module.exports.salvar = function( application, req, res ){

    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var dadosForms = req.body;
    req.assert('cnpj', 'cnpj é obrigatório').notEmpty();
    req.assert('razao', 'Razão é obrigatório').notEmpty();       
    req.assert('fantasia', 'Fantasia é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();

    if(erros){
      
        res.render('empresaEditar', {validacao: erros,  empresas: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);        
    
    empresaDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            res.render('empresaEditar', { validacao : [ {'msg': error.sqlMessage }], empresas : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/empresa');
    });
     
}