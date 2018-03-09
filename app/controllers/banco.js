module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var bancoDao = new application.app.models.BancoDAO(connection);
    
    bancoDao.listar(function(error, bancos){
        connection.end();
        if( error ) {
            res.render('bancoListar', { validacao : [ {'msg': error.sqlMessage }], bancos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('bancoListar', { validacao : {}, bancos : bancos, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    res.render('bancoEditar', { validacao : {}, bancos : {} , sessao: req.session.usuario });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var bancoDao = new application.app.models.BancoDAO(connection);
    
    bancoDao.editar( req.params._id, function(error, bancos){
        connection.end();
        if( error ) {
            res.render('bancoEditar', { validacao : [ {'msg': error.sqlMessage }], bancos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('bancoEditar', { validacao : {}, bancos : bancos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var bancoDao = new application.app.models.BancoDAO(connection);
    
    bancoDao.excluir( req.params._id, function(error, bancos){
        connection.end();
        if( error ) {
            res.render('banco', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], bancos : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/banco");
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
      
        res.render('bancoEditar', {validacao: erros,  bancos: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var bancoDao = new application.app.models.BancoDAO(connection);        
    
    
    bancoDao.salvar(dadosForms, function(error, result){
        connection.end();    
        
        if( error ) {
            res.render('bancoEditar', { validacao : [ {'msg': error.sqlMessage }], bancos : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/banco');
    });
}