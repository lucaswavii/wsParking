module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.listar(function(error, caixas){
        connection.end();
        if( error ) {
            res.render('caixaListar', { validacao : [ {'msg': error.sqlMessage }], caixas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('caixaListar', { validacao : {}, caixas : caixas, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('caixaEditar', { validacao : {}, caixas : {} , sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.editar( req.params._id, function(error, caixas){
        connection.end();
        if( error ) {
            res.render('caixaEditar', { validacao : [ {'msg': error.sqlMessage }], caixas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('caixaEditar', { validacao : {}, caixas : caixas, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.excluir( req.params._id, function(error, caixas){
        connection.end();
        if( error ) {
            res.render('caixa', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], caixas : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/caixa");
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
      
        res.render('caixaEditar', {validacao: erros,  caixas: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);        
    
    
    caixaDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('caixaEditar', { validacao : [ {'msg': error.sqlMessage }], caixas : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/caixa');
    });
}