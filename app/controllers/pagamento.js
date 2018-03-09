module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    
    pagamentoDao.listar(function(error, pagamentos){
        connection.end();
        if( error ) {
            res.render('pagamentoListar', { validacao : [ {'msg': error.sqlMessage }], pagamentos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('pagamentoListar', { validacao : {}, pagamentos : pagamentos, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('pagamentoEditar', { validacao : {}, pagamentos : {}, sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    
    pagamentoDao.editar( req.params._id, function(error, pagamentos){
        connection.end();
        if( error ) {
            res.render('pagamentoEditar', { validacao : [ {'msg': error.sqlMessage }], pagamentos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('pagamentoEditar', { validacao : {}, pagamentos : pagamentos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    
    pagamentoDao.excluir( req.params._id, function(error, pagamentos){
        connection.end();
        if( error ) {
            res.render('pagamento', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], pagamentos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/pagamento");
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
      
        res.render('pagamentoEditar', {validacao: erros,  pagamentos: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);        
    
    pagamentoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        if( error ) {
            res.render('pagamentoEditar', { validacao : [ {'msg': error.sqlMessage }], pagamentos : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/pagamento');
    });
}